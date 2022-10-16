# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @category = build(:category)
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_name_shouldnt_be_valid_and_saved_without_name
    @category.name = ""
    assert_not @category.valid?
  end

  def test_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_name_should_be_unique
    @category.save!

    test_category = @category.dup
    assert_not test_category.valid?
  end

  def test_position_should_be_set_on_create
    @category.save!
    assert_not_nil @category.position
  end

  def test_position_should_be_incremented_on_create
    @category.save!
    test_category = build(:category, user: @category.user)
    test_category.save!
    assert_equal @category.position + 1, test_category.position
  end

  def test_shouldnt_create_category_without_user
    @category.user = nil
    assert_not @category.valid?
  end
end
