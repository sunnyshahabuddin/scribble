# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users

  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  has_secure_password validations: false
  has_secure_token :authentication_token
end
