# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validates :to, presence: true
  validate :check_redirection_loop, :to_and_from_not_equal

  belongs_to :organization

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(:redirection, t("redirection.equal"))
      end
    end

    def check_redirection_loop
      to_path = self.to
      while to_path != self.from
        redirection = Redirection.find_by(from: to_path)
        if redirection != nil && self.from == redirection.to
          errors.add(:redirection, t("redirection.cycle"))
        elsif redirection == nil
          break
        end
        to_path = redirection.to
      end
    end
end
