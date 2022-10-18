# frozen_string_literal: true

require "test_helper"

class WebsitesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @website = create(:website)
  end

  def test_should_get_index
    get websites_path
    assert_response :success
  end

  def test_should_acces_with_valid_credentials
    post websites_path, params: { password: @website.password }, as: :json
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @website.authentication_token
  end

  def test_shouldnt_authorize_with_invalid_credentials
    post websites_path, params: { website: { password: "invalid password" } }, as: :json
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["message"], "Invalid password."
  end

  def test_should_update_website
    patch website_path(@website), params: { name: "new name", password: "new password" }, as: :json
    assert_response :success
    assert_equal response.parsed_body["message"], "Website updated successfully."
  end

  def test_should_update_website_with_password_nil
    patch website_path(@website), params: { name: "new name", password: nil }, as: :json
    assert_response :success
    assert_equal response.parsed_body["message"], "Website updated successfully."
  end
end
