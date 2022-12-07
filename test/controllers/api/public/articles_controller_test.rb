# frozen_string_literal: true

require "test_helper"

class Api::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_published_articles
    get api_public_articles_path, as: :json
    assert_response :ok

    response_json = response.parsed_body
    all_articles = @user.articles.where(status: 1).count
    assert_equal all_articles, response_json["articles"].count
  end

  def test_should_show_published_article
    dummy_article = create(:article, status: 1, category: @category, user: @user)
    get api_public_article_path(dummy_article.slug), as: :json
    assert_response :ok

    response_json = response.parsed_body
    assert_equal dummy_article.title, response_json["title"]
  end

  def test_shouldnt_list_all_articles_if_unauthorized
    @organization.update!(is_password_protected: true)
    get api_public_articles_path, as: :json
    assert_response :unauthorized
  end
end
