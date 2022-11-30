# frozen_string_literal: true

class Api::Admin::ArticlePublishLaterService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process
    publish_later if article.status == 0
  end

  private

    def publish_later
      article.update!(status: 1)
      article.schedule.update!(publish_at: nil)
    end
end
