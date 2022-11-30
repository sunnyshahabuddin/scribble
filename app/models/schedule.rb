# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :article_id, presence: true, uniqueness: true

  validate :publish_at_cannot_be_in_the_past, :add_publish_later_only_if_article_is_draft, if: -> {
 publish_at.present? }
  validate :unpublish_at_cannot_be_in_the_past, :add_unpublish_later_only_if_article_is_published, if: -> {
 unpublish_at.present? }
  validate :unpublish_schedule_should_be_after_publish_schedule,
    :publish_schedule_should_be_after_unpublish_schedule, if: -> {
 publish_at.present? && unpublish_at.present? }

  private

    def publish_at_cannot_be_in_the_past
      if publish_at.present? && publish_at < Time.zone.now
        errors.add(:publish_at, t("schedule.before_time"))
      end
    end

    def add_publish_later_only_if_article_is_draft
      if article.status == 1 && unpublish_at.nil?
        errors.add(:article, t("schedule.article_publish"))
      end
    end

    def unpublish_at_cannot_be_in_the_past
      if unpublish_at.present? && unpublish_at < Time.zone.now
        errors.add(:unpublish_at, t("schedule.before_time"))
      end
    end

    def add_unpublish_later_only_if_article_is_published
      if article.status == 0 && publish_at.nil?
        errors.add(:article, t("schedule.article_draft"))
      end
    end

    def unpublish_schedule_should_be_after_publish_schedule
      if publish_at.present? && article.status == 0 && unpublish_at < publish_at
        errors.add(:unpublish_at, t("schedule.unpublish_before"))
      end
    end

    def publish_schedule_should_be_after_unpublish_schedule
      if unpublish_at.present? && article.status == 1 && publish_at < unpublish_at
        errors.add(:publish_at, t("schedule.publish_before"))
      end
    end

    def article
      Article.find(article_id)
    end
end
