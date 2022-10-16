# frozen_string_literal: true

require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @website = create(:website)
  end

  def test_website_should_be_valid
    assert @website.valid?
  end

  def test_website_shouldnt_be_valid_and_saved_without_name
    @website.name = nil
    assert @website.invalid?
    assert_includes @website.errors.full_messages, "Name can't be blank"
  end

  def test_website_should_be_valid_without_password
    @website.password = nil
    assert @website.valid?
  end

  def test_website_shouldnt_be_valid_with_password_less_than_6_characters
    @website.password = "pass1"
    assert @website.invalid?
    assert_includes @website.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_website_should_be_valid_with_password_more_than_6_characters
    @website.password = "pass123"
    assert @website.valid?
  end

  def test_website_should_be_valid_without_authentication_token
    @website.authentication_token = nil
    assert @website.valid?
  end

  def test_website_should_be_valid_with_authentication_token
    @website.authentication_token = "token123"
    assert @website.valid?
  end

  def test_website_shouldnt_be_nameless
    @website.name = ""
    assert @website.invalid?
    assert_includes @website.errors.full_messages, "Name can't be blank"
  end
end
