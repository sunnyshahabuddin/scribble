# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @redirection = build(:redirection)
  end

  def test_should_list_all_redirection
    get redirections_path
    assert_response :ok
  end

  def test_should_create_redirection
    post redirections_path, params: { redirection: { from: "http://localhost:3000/home", to: "http://localhost:3000" } }
    assert_response :ok
  end

  def test_should_update_redirection
    @redirection.save!
    put redirection_path(@redirection.id), params: { redirection: { from: "http://example/home", to: "http://example" } }
    assert_response :ok
  end

  def test_should_destroy_redirection
    @redirection.save!
    delete redirection_path(@redirection.id)
    assert_response :ok
  end

  def test_shouldnt_create_redirection_without_from_path
    post redirections_path, params: { redirection: { from: "", to: "http://example" } }
    assert_response :unprocessable_entity
  end

  def test_shouldnt_create_redirection_without_to_path
    post redirections_path, params: { redirection: { from: "http://example/home", to: "" } }
    assert_response :unprocessable_entity
  end

  def test_shouldnt_create_redirection_if_from_path_already_exist
    post redirections_path, params: { redirection: { from: @redirection.from, to: @redirection.to } }
    assert_response :ok

    post redirections_path, params: { redirection: { from: @redirection.from, to: "http://example" } }
    assert_response :unprocessable_entity
  end

  def test_should_create_redirection_if_to_path_already_exist
    post redirections_path, params: { redirection: { from: @redirection.from, to: @redirection.to } }
    assert_response :ok

    post redirections_path, params: { redirection: { from: "http://example/home", to: @redirection.to } }
    assert_response :ok
  end

  def test_shouldnt_update_redirection_without_from_path
    @redirection.save!
    put redirection_path(@redirection.id), params: { redirection: { from: "", to: "http://example" } }
    assert_response :unprocessable_entity
  end

  def test_shouldnt_update_redirection_without_to_path
    @redirection.save!
    put redirection_path(@redirection.id), params: { redirection: { from: "http://example/home", to: "" } }
    assert_response :unprocessable_entity
  end
end
