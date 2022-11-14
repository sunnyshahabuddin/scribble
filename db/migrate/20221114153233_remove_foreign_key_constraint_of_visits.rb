# frozen_string_literal: true

class RemoveForeignKeyConstraintOfVisits < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :visits, :articles
  end
end
