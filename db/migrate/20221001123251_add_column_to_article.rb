# frozen_string_literal: true

class AddColumnToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :title, :text
    add_column :articles, :body, :text
  end
end
