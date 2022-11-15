# frozen_string_literal: true

class AddOrganizationForeignKeyConstraints < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :organization_id, :integer
    add_column :users, :organization_id, :uuid
    remove_column :redirections, :organization_id, :integer
    add_column :redirections, :organization_id, :uuid
    add_foreign_key :users, :organizations, on_delete: :cascade
    add_foreign_key :redirections, :organizations, on_delete: :cascade
  end
end
