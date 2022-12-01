# frozen_string_literal: true

class Schedule < ApplicationRecord
  include ActiveModel::Validations

  belongs_to :article

  validates :article_id, presence: true, uniqueness: true
  validates_with ScheduleValidator
end
