# frozen_string_literal: true

class Api::Admin::ArticleScheduleLaterService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process
    article.publish_at.nil? ? unpublish_later : publish_later
  end

  private

    def publish_later
      article.update!(status: 1, publish_at: nil)
    end

    def unpublish_later
      article.update!(status: 0, unpublish_at: nil)
    end
end
