# frozen_string_literal: true

class AddVisitCountAndArticleIdToVisits < ActiveRecord::Migration[6.1]
  def change
    add_column :visits, :visits, :integer, default: 0
    add_column :visits, :article_id, :integer
    add_foreign_key :visits, :articles, on_delete: :cascade
  end
end
