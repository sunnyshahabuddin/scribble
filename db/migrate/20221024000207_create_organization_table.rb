# frozen_string_literal: true

class CreateOrganizationTable < ActiveRecord::Migration[6.1]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
