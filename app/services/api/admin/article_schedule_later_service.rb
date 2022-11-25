# frozen_string_literal: true

class Api::Admin::ArticleScheduleLaterService
  attr_reader :id, :schedule_status

  def initialize(id, schedule_status)
    @id = id
    @schedule_status = schedule_status
  end

  def process
    if Article.where(id: id).present?
      @article = Article.find(id)
      publish_later if schedule_status == 1
    end
  end

  private

    def publish_later
      @article.update!(status: 1)
    end
end
