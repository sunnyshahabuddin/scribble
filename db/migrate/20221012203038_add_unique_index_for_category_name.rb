# frozen_string_literal: true

class AddUniqueIndexForCategoryName < ActiveRecord::Migration[6.1]
  def change
    add_index :categories, :name, unique: true
  end
end
