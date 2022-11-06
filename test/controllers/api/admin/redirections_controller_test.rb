# frozen_string_literal: true

require "test_helper"

class Api::Admin::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @redirection = create(:redirection, organization: @organization)
  end

  def test_should_list_all_redirection
    get api_admin_redirections_path, as: :json
    assert_response :ok
  end

  def test_should_create_redirection
    test_redirection = build(:redirection, organization: @organization)
    post api_admin_redirections_path, params: { redirection: { from: test_redirection.from, to: test_redirection.to } },
      as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Redirection"), response_json["notice"]
  end

  def test_should_update_redirection
    put api_admin_redirection_path(@redirection.id),
      params: { redirection: { from: "http://example/home", to: "http://example" } }, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Redirection"), response_json["notice"]
  end

  def test_should_destroy_redirection
    delete api_admin_redirection_path(@redirection.id), as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: "Redirection"), response_json["notice"]
  end
end
