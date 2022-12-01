# frozen_string_literal: true

require "test_helper"

class Api::Admin::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @schedule = create(:schedule, article: @article)
  end

  def test_should_create_schedule
    dummy_article = create(:article, category: @category, user: @user)
    post api_admin_schedules_path,
      params: {
        schedule: {
          publish_at: @schedule.publish_at, unpublish_at: @schedule.unpublish_at,
          article_id: dummy_article.id
        }
      }, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Schedule"), response_json["notice"]
  end

  def test_should_update_schedule
    put api_admin_schedule_path(@schedule.id),
      params: {
        schedule: {
          publish_at: nil, unpublish_at: nil
        }
      }, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Schedule"), response_json["notice"]
  end

  def test_should_list_schedules
    @schedule.update(publish_at: Time.zone.now + 20.minutes)
    get api_admin_schedules_path, as: :json
    assert_response :ok
    response_json = response.parsed_body
    schedules_count = Schedule.count
    assert_equal schedules_count, response_json["schedules"].count
  end
end
