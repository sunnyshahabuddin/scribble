# frozen_string_literal: true

class Website < ApplicationRecord
  validates :name, presence: true
  has_secure_password
end
