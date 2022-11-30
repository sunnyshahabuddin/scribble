# frozen_string_literal: true

class Api::Admin::ArticleUnpublishLaterService
  attr_reader :article

  def initialize(article)
    @article = article
  end

  def process
    unpublish_later if article.status == 1
  end

  private

    def unpublish_later
      article.update!(status: 0)
      article.schedule.update!(unpublish_at: nil)
    end
end
