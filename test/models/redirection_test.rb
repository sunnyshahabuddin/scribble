# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_should_be_valid
    assert @redirection.valid?
  end

  def test_redirection_from_path_shouldnt_be_null
    @redirection.from = ""
    assert_not @redirection.valid?
  end

  def test_redirection_to_path_shouldnt_be_null
    @redirection.to = ""
    assert_not @redirection.valid?
  end

  def test_redirection_from_path_should_be_unique
    test_redirection = @redirection.dup
    assert_not test_redirection.valid?
  end
end
