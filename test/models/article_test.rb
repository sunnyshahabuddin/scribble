# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @user = build(:user)
    @category = build(:category, user: @user)
    @article = build(:article, category: @category, user: @user)
  end

  def test_article_should_be_valid
    assert @article.valid?
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_article_with_duplicate_two_worded_titles
    first_article = Article.create!(title: "Dummy title", category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: "Dummy title", category: @category, body: @article.body, user: @user)

    assert_equal "dummy-title", first_article.slug
    assert_equal "dummy-title-2", second_article.slug
  end

  def test_incremental_slug_generation_for_article_with_duplicate_hyphenated_titles
    first_article = Article.create!(title: "dummy-title", category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: "dummy-title", category: @category, body: @article.body, user: @user)

    assert_equal "dummy-title", first_article.slug
    assert_equal "dummy-title-2", second_article.slug
  end

  def test_slug_generation_for_article_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(title: "fishing", category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: "fish", category: @category, body: @article.body, user: @user)

    assert_equal "fishing", first_article.slug
    assert_equal "fish", second_article.slug
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "Dummy"
    first_article = Article.create!(title: title, category: @category, body: @article.body, user: @user)
    second_article = Article.create!(title: title, category: @category, body: @article.body, user: @user)
    third_article = Article.create!(title: title, category: @category, body: @article.body, user: @user)

    assert_equal third_article.slug, "#{title.parameterize}-3"

    second_article.destroy

    expected_slug_suffix_for_new_article = third_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(title: title, category: @category, body: @article.body, user: @user)
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_values_of_created_at_and_updated_at_shold_be_present_and_not_nil
    article = Article.new(title: @article.title, category: @category, body: @article.body, user: @user)
    assert_nil article.created_at
    assert_nil article.updated_at

    article.save!
    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at
  end

  def test_values_of_created_at_and_updated_at_should_not_be_equal_after_update
    article = Article.new(title: @article.title, category: @category, body: @article.body, user: @user)
    article.save!
    article.update!(title: "This is a updated article")
    assert_not_equal article.updated_at, article.created_at
  end
end
