# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validates :to, presence: true

  validate :check_redirection_loop, :to_and_from_not_equal

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:redirection, t("redirection.equal"))
      end
    end

    def check_redirection_loop
      if to_exist_in_from? && from_exist_in_to?
        errors.add(:redirection, t("redirection.cycle"))
      end
    end

    def to_exist_in_from?
      Redirection.where(to: self.from).present?
    end

    def from_exist_in_to?
      Redirection.where(from: self.to).present?
    end
end
