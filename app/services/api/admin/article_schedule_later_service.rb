# frozen_string_literal: true

class Api::Admin::ArticleScheduleLaterService
  attr_reader :schedule, :article

  def initialize(schedule, article)
    @schedule = schedule
    @article = article
  end

  def process
    schedule.publish_at.nil? ? unpublish_later : publish_later
  end

  private

    def publish_later
      article.update!(status: 1)
      schedule.update!(publish_at: nil)
    end

    def unpublish_later
      article.update!(status: 0)
      schedule.update!(unpublish_at: nil)
    end
end
