# frozen_string_literal: true

class AddForeignKeyConstraintsOfUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :user_id, :integer
    add_column :articles, :user_id, :uuid
    remove_column :categories, :user_id, :integer
    add_column :categories, :user_id, :uuid
    add_foreign_key :articles, :users, on_delete: :cascade
    add_foreign_key :categories, :users, on_delete: :cascade
  end
end
