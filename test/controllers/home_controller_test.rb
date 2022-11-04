# frozen_string_literal: true

require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_get_successfully_from_root_url
    get root_path
    assert_response :success
  end

  def test_should_redirect_from_path_to_to_path
    @redirection = @organization.redirections.create(from: "/test", to: "/test2")
    get @redirection.from
    assert_redirected_to @redirection.to
  end
end
