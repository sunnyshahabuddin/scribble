# frozen_string_literal: true

class AddDraftArticlesCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :draft_articles_count, :integer, null: false, default: 0
  end
end
