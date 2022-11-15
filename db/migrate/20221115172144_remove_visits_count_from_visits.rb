# frozen_string_literal: true

class RemoveVisitsCountFromVisits < ActiveRecord::Migration[6.1]
  def change
    remove_column :visits, :visits_count, :integer
  end
end
