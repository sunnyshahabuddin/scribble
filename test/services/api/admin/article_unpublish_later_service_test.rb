# frozen_string_literal: true

class Api::Admin::ArticleUnpublishLaterServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
    @time = Time.zone.now + 20.minutes
  end

  def test_should_unpublish_article_if_unpublish_at_is_present_and_article_is_published
    @article.update!(status: 1)
    @schedule.update!(unpublish_at: @time, publish_at: nil)
    travel_to @time
    Api::Admin::ArticleUnpublishLaterService.new(@article).process
    assert_equal 0, @article.status
    assert_nil @schedule.unpublish_at
  end
end
