# frozen_string_literal: true

class AddArticleVersionStatusToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :version_status, :boolean, default: false
  end
end
