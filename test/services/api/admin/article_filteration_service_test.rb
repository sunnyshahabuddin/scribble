# frozen_string_literal: true

class Api::Admin::ArticleFilterationServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, category: @category)
  end

  def test_should_list_all_articles_if_no_filter_present
    first_article = create(:article, user: @user, category: @category)
    second_article = create(:article, user: @user, category: @category)
    response = Api::Admin::ArticleFilterationService.new(@user.articles, nil, nil, nil).process
    assert_equal [@article, first_article, second_article], response
  end

  def test_should_filter_articles_by_status
    first_article = create(:article, user: @user, category: @category, status: 1)
    second_article = create(:article, user: @user, category: @category, status: 0)
    response = Api::Admin::ArticleFilterationService.new(@user.articles, nil, 1, nil).process
    assert_equal [first_article], response
  end

  def test_should_filter_articles_by_search_term
    first_article = create(:article, user: @user, category: @category, title: "Dummy title")
    second_article = create(:article, user: @user, category: @category, title: "Cannot search me")
    response = Api::Admin::ArticleFilterationService.new(@user.articles, "dummy", nil, nil).process
    assert_equal [first_article], response
  end

  def test_should_filter_article_by_category_filter
    first_article = create(:article, user: @user, category: @category)
    second_article = create(:article, user: @user, category: @category)
    response = Api::Admin::ArticleFilterationService.new(
      @user.articles, nil, nil,
      [first_article.category_id].join(",")).process
    assert_equal [@article, first_article, second_article], response
  end
end
