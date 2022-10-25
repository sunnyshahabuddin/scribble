# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_show_organization
    get organization_path
    assert_response :success
  end

  def test_should_acces_with_valid_credentials
    post organization_path, params: { password: @organization.password }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @organization.authentication_token
  end

  def test_shouldnt_authorize_with_invalid_credentials
    post organization_path, params: { organization: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal "Invalid password.", response_json["message"]
  end

  def test_should_update_organization
    @organization.save!
    put organization_path, params: { name: "new name", password: "newpassword123" }, as: :json
    assert_response :success
    assert_equal response.parsed_body["notice"], t("successfully_updated", entity: Organization)
  end
end
