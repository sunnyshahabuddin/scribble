# frozen_string_literal: true

class User < ApplicationRecord
  MAX_EMAIL_LENGTH = 255
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  validates :name, presence: true
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase

  has_many :articles

  private

    def to_lowercase
      email.downcase!
    end
end
