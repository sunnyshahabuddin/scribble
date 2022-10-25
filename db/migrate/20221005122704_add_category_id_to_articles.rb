# frozen_string_literal: true

class AddCategoryIdToArticles < ActiveRecord::Migration[6.1]
  def change
    Article.reset_column_information
    add_column :articles, :category_id, :integer
  end
end
