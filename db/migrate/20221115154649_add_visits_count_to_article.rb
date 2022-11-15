# frozen_string_literal: true

class AddVisitsCountToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visits_count, :integer, default: 0, null: false
  end
end
