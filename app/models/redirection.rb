# frozen_string_literal: true

class Redirection < ApplicationRecord
  include ActiveModel::Validations

  validates :from, presence: true, uniqueness: true
  validates :to, presence: true
  validates_with RedirectionValidator

  belongs_to :organization
end
