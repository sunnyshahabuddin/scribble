# frozen_string_literal: true

require "test_helper"
class ArticleScheduleLaterWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 20.minutes
  end

  def test_should_publish_article_if_publish_at_is_present_and_less_than_current_time
    @schedule.update(publish_at: @time)
    travel_to @time + 1.minute
    ArticleScheduleLaterWorker.perform_async
    assert_equal 1, @article.reload.status
    assert_nil @schedule.reload.publish_at
  end

  def test_should_unpublish_article_if_unpublish_at_is_present_and_less_than_current_time
    @article.update!(status: 1)
    @schedule.update!(unpublish_at: @time, publish_at: nil)
    travel_to @time + 1.minute
    ArticleScheduleLaterWorker.perform_async
    assert_equal 0, @article.reload.status
    assert_nil @schedule.reload.unpublish_at
  end
end
