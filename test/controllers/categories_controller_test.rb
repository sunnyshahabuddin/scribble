# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_show_all_categories
    get categories_path, as: :json
    assert_response :ok
  end

  def test_should_create_category
    post categories_path, params: { category: { name: "Tourism", user_id: @user.id } }, as: :json
    assert_response :ok
  end

  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: "", user_id: @user.id } }, as: :json
    assert_response :unprocessable_entity
  end

  def test_shouldnt_create_category_with_existing_name
    @category.save
    post categories_path, params: { category: { name: @category.name, user_id: @user.id } }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Name has already been taken"
  end

  def test_should_update_category
    @category.save
    category_params = { category: { name: "Travel", user_id: @user.id } }
    put category_path(@category.id), params: category_params, as: :json
    assert_response :success
  end

  def test_should_delete_category
    @category.save
    delete category_path(@category.id), as: :json
    assert_response :ok
  end
end
