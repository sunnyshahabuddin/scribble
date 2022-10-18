# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @user = create(:user)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get articles_path, as: :json
    assert_response :success
    response_json = response.parsed_body

    all_articles = response_json["articles"]
    draft_article = response_json["draftArticles"]
    published_article = response_json["publishedArticles"]

    total_article_count = draft_article.length + published_article.length

    assert_equal total_article_count, all_articles.length
  end

  def test_shouldnt_create_article_without_title
    post articles_path,
      params: { article: { title: "", category_id: @category.id, user_id: @user.id, body: @article.body } }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Title can't be blank", response_json["error"]
  end

  def test_shouldnt_change_article_title_to_blank
    article_params = { article: { title: "" } }

    put article_path(@article.slug), params: article_params, as: :json
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_shouldnt_create_article_without_category
    post articles_path,
      params: {
        article: {
          title: @article.title, category_id: nil, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Category must exist", response_json["error"]
  end

  def test_shouldnt_create_article_without_body
    post articles_path,
      params: { article: { title: @article.title, category_id: @category.id, user_id: @user.id, body: nil } }, as: :json
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal "Body can't be blank", response_json["error"]
  end

  def test_user_can_update_any_article_field
    article_slug = @article.slug
    article_title = @article.title

    post articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }, as: :json
    assert_response :success

    @article.reload

    put article_path(article_slug),
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
      delete article_path(@article.slug), as: :json
    end
    assert_response :ok
  end
end
