# frozen_string_literal: true

class RemoveIntegerIdFromRedirection < ActiveRecord::Migration[6.1]
  def change
    remove_column :redirections, :integer_id, :bigint
  end
end
