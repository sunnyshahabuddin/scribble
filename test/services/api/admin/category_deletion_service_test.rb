# frozen_string_literal: true

require "test_helper"

class Api::Admin::CategoryDeletionServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_not_delete_general_category_if_it_is_last
    @category.name = "General"
    @category.save!
    response = Api::Admin::CategoryDeletionService.new(@category.id, nil, @user).process
    assert_nil response
  end

  def test_should_move_articles_to_general_if_last_category_is_deleted
    @article = create(:article, user: @user, category: @category)
    Api::Admin::CategoryDeletionService.new(@category.id, nil, @user).process
    assert_equal "General", @user.categories.last.name
  end

  def test_should_move_articles_to_selected_category
    @article = create(:article, user: @user, category: @category)
    new_category = create(:category, user: @user)
    Api::Admin::CategoryDeletionService.new(@category.id, new_category.id, @user).process
    assert_equal new_category.id, @user.articles.last.category_id
  end
end
