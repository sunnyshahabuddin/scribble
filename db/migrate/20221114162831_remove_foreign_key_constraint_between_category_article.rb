# frozen_string_literal: true

class RemoveForeignKeyConstraintBetweenCategoryArticle < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :articles, :categories
  end
end
