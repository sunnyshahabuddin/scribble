# frozen_string_literal: true

class Api::Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_show_only_those_categories_which_have_published_articles
    dummy_article_1 = create(:article, user: @user, category_id: @category.id, status: 1)
    dummy_article_3 = create(:article, user: @user, category_id: @category.id, status: 1)
    get api_public_categories_path, as: :json
    assert_response :success
    response_json = response.parsed_body
    response_json = response_json["categories"][0]
    assert_equal 2, response_json["articles"].count
  end
end
