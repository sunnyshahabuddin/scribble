# frozen_string_literal: true

class Api::Admin::MoveArticlesServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, category: @category)
  end

  def test_should_move_articles_to_category
    category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)

    moved_articles = Api::Admin::MoveArticlesService.new(
      @user, category.id,
      [first_article.id, second_article.id]).process

    assert_equal category.articles, moved_articles
  end
end
