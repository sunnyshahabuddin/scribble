# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
  end

  def test_shouldnt_allow_publish_at_to_be_in_the_past
    @schedule.publish_at = Time.zone.now - 2.days
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.before_time")
  end

  def test_shouldnt_allow_unpublish_at_to_be_in_the_past
    @schedule.unpublish_at = Time.zone.now - 2.days
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.before_time")
  end

  def test_should_add_publish_later_only_if_article_is_draft_and_unpublish_at_is_not_present
    @article.update!(status: 1)
    @schedule.unpublish_at = nil
    @schedule.publish_at = Time.zone.now + 2.days
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.article_publish")
  end

  def test_should_add_unpublish_later_only_if_article_is_published_and_publish_at_is_not_present
    @schedule.publish_at = nil
    @schedule.unpublish_at = Time.zone.now + 2.days
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.article_draft")
  end

  def test_shouldnt_allow_unpublish_schedule_before_publish_schedule_if_article_is_draft
    @schedule.publish_at = Time.zone.now + 2.days
    @schedule.unpublish_at = Time.zone.now + 1.day
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.unpublish_before")
  end

  def test_shouldnt_allow_publish_schedule_before_unpublish_schedule_if_article_is_published
    @article.update!(status: 1)
    @schedule.unpublish_at = Time.zone.now + 2.days
    @schedule.publish_at = Time.zone.now + 1.day
    assert_not @schedule.valid?
    assert_includes @schedule.errors_to_sentence, t("schedule.publish_before")
  end
end
