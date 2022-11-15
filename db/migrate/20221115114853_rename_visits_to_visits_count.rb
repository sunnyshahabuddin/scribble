# frozen_string_literal: true

class RenameVisitsToVisitsCount < ActiveRecord::Migration[6.1]
  def change
    rename_column :visits, :visits, :visits_count
  end
end
