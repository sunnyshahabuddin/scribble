# frozen_string_literal: true

class AddStatusDefaultValueToArticle < ActiveRecord::Migration[6.1]
  def change
    change_column_default :articles, :status, 0
  end
end
