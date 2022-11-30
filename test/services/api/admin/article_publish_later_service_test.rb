# frozen_string_literal: true

class Api::Admin::ArticlePublishLaterServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 20.minutes
  end

  def test_should_publish_article_if_publish_at_is_present_and_article_is_drafted
    @schedule.update(publish_at: @time, unpublish_at: nil)
    travel_to @time
    Api::Admin::ArticlePublishLaterService.new(@article).process
    assert_equal 1, @article.status
    assert_nil @schedule.publish_at
  end
end
