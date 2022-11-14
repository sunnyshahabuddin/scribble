# frozen_string_literal: true

class RemoveOrganizationForeignKeyConstraints < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :users, :organizations
    remove_foreign_key :redirections, :organizations
  end
end
