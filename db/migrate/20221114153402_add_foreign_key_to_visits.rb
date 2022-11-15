# frozen_string_literal: true

class AddForeignKeyToVisits < ActiveRecord::Migration[6.1]
  def change
    remove_column :visits, :article_id, :integer
    add_column :visits, :article_id, :uuid
    add_foreign_key :visits, :articles, on_delete: :cascade
  end
end
