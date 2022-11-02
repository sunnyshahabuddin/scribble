# frozen_string_literal: true

class ChangeObjectColumnTypeInVersions < ActiveRecord::Migration[6.1]
  def change
    change_column :versions, :object, :json, using: "object::JSON"
  end
end
