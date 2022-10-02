# frozen_string_literal: true

class Article < ApplicationRecord
  validates :title, :body, :status, presence: true
end
