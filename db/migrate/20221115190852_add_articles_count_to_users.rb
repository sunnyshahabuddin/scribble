# frozen_string_literal: true

class AddArticlesCountToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :articles_count, :integer, default: 0, null: false
  end
end
