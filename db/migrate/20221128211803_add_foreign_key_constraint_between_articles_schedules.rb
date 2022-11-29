# frozen_string_literal: true

class AddForeignKeyConstraintBetweenArticlesSchedules < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :schedules, :articles, on_delete: :cascade
  end
end
