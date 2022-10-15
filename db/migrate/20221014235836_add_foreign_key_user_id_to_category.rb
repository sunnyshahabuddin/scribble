# frozen_string_literal: true

class AddForeignKeyUserIdToCategory < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :categories, :users
  end
end
