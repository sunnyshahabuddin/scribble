# frozen_string_literal: true

require "test_helper"

class Api::Admin::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_show_all_categories
    get api_admin_categories_path, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal @user.categories.count, response_json["categories"].count
  end

  def test_should_create_category
    post api_admin_categories_path, params: { category: { name: "Tourism", user_id: @user.id } }, as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: Category), response_json["notice"]
  end

  def test_should_update_category
    category_params = { category: { name: "Travel", user_id: @user.id } }
    put api_admin_category_path(@category.id), params: category_params, as: :json
    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: Category), response_json["notice"]
  end

  def test_should_update_categories_positions
    first_category = create(:category, user: @user)
    second_category = create(:category, user: @user)
    third_category = create(:category, user: @user)

    category_id_list = [third_category.id, first_category.id, second_category.id]
    last_position = @category.position
    put position_update_api_admin_categories_path, params: { category_id_list: category_id_list }, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("position_successfully_updated", entity: Category), response_json["notice"]
  end

  def test_should_ensure_category_is_deleted_with_the_service
    delete api_admin_category_path(@category.id), as: :json
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: Category), response_json["notice"]
  end

  def test_shouldnt_create_category_with_same_name
    post api_admin_categories_path, params: { category: { name: @category.name, user_id: @user.id } }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Name has already been taken", response_json["error"]
  end

  def test_shouldnt_update_category_if_parameter_is_missing
    put api_admin_category_path(@category.id), params: { category: {} }, as: :json
    assert_response :internal_server_error
  end
end
