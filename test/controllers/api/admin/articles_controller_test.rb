# frozen_string_literal: true

require "test_helper"

class Api::Admin::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_user_can_update_any_article_field
    article_id = @article.id
    article_title = @article.title

    post api_admin_articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    @article.reload

    put api_admin_article_path(article_id),
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    assert_equal article_title, @article.title
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete api_admin_article_path(@article.id), as: :json
    end
    assert_response :ok
    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: "Article"), response_json["notice"]
  end

  def test_should_create_article
    post api_admin_articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_list_all_versions_of_articles
    get versions_api_admin_article_path(@article.id), as: :json
    assert_response :success
  end

  def test_should_list_published_articles
    get list_published_api_admin_articles_path, as: :json
    assert_response :success
  end

  def test_should_show_article
    get api_admin_article_path(@article.id), as: :json
    assert_response :success
  end

  def test_should_list_all_articles
    get api_admin_articles_path, as: :json
    assert_response :success
  end

  def test_shouldnt_show_article_if_not_found
    get api_admin_article_path(0), as: :json
    assert_response :not_found
  end

  def test_should_show_all_articles_count
    get total_count_api_admin_articles_path, as: :json
    assert_response :success
  end
end
