# frozen_string_literal: true

class Api::Admin::ArticleScheduleLaterServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
  end

  def test_should_publish_article_if_publish_at_is_present_and_less_than_current_time
    @schedule.update!(publish_at: Time.zone.now + 1.second, unpublish_at: nil)
    sleep(1)
    Api::Admin::ArticleScheduleLaterService.new(@schedule, @article).process
    assert_equal 1, @article.status
    assert_nil @schedule.publish_at
  end

  def test_should_unpublish_article_if_unpublish_at_is_present_and_less_than_current_time
    @article.update!(status: 1)
    @schedule.update!(unpublish_at: Time.zone.now + 1.second, publish_at: nil)
    sleep(1)
    Api::Admin::ArticleScheduleLaterService.new(@schedule, @article).process
    assert_equal 0, @article.status
    assert_nil @schedule.unpublish_at
  end
end
