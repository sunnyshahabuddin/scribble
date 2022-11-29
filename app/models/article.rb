# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 255
  MAX_PAGE_SIZE = 10

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  validates :body, :status, presence: true
  validate :slug_not_changed

  belongs_to :category
  belongs_to :user
  has_many :visits
  has_one :schedule

  before_create :set_slug, if: -> { status == 1 }
  before_update :set_slug, if: -> { slug.nil? && status == 1 }

  paginates_per MAX_PAGE_SIZE
  has_paper_trail only: [:title, :body, :status, :category_id]
  counter_culture :user, column_name: proc { |model|
 model.status == 0 ? "draft_articles_count" : "published_articles_count" }

  private

    def set_slug
      title_slug = title.parameterize
      latest_article_slug = Article.where(
        "slug LIKE ? or slug LIKE ?",
        "#{title_slug}",
        "#{title_slug}-%"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end
end
