# frozen_string_literal: true

class AddUniqueIndexArticleIdToSchedule < ActiveRecord::Migration[6.1]
  def change
    add_index :schedules, :article_id, unique: true
  end
end
