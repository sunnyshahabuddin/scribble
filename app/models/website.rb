# frozen_string_literal: true

class Website < ApplicationRecord
  validates :name, presence: true
  has_secure_password validations: false
  has_secure_token :authentication_token
end
