# frozen_string_literal: true

class AddRestoredAtToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :restored_at, :datetime, default: nil
  end
end
