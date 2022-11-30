# frozen_string_literal: true

class Api::Admin::ArticleScheduleLaterService
  attr_reader :schedule, :article

  def initialize(schedule, article)
    @schedule = schedule
    @article = article
  end

  def process
    publish_later if schedule.publish_at.present? && schedule.publish_at <= Time.zone.now
    unpublish_later if schedule.unpublish_at.present? && schedule.unpublish_at <= Time.zone.now
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
