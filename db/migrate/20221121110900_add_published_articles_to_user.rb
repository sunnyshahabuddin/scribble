# frozen_string_literal: true

class AddPublishedArticlesToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :published_articles_count, :integer, default: 0, null: false
  end
end
