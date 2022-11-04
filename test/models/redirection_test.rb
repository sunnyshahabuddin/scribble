# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @redirection = create(:redirection, organization: @organization)
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

  def test_redirection_to_and_from_shouldnt_be_same
    test_redirection = create(:redirection, organization: @organization)
    test_redirection.from = test_redirection.to
    assert_not test_redirection.valid?
  end

  def test_shouldnt_create_cycle
    first_redirection = build(:redirection, organization: @organization)
    second_redirection = build(:redirection, organization: @organization)
    third_redirection = build(:redirection, organization: @organization)

    second_redirection.from = first_redirection.to
    third_redirection.from = second_redirection.to
    third_redirection.to = first_redirection.from

    first_redirection.save!
    second_redirection.save!

    assert_raises ActiveRecord::RecordInvalid do
      third_redirection.save!
    end

    assert_match t("redirection.cycle"), third_redirection.errors.full_messages.to_sentence
  end
end
