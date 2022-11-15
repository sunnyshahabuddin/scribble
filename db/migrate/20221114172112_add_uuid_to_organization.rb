# frozen_string_literal: true

class AddUuidToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :uuid, :uuid, default: "gen_random_uuid()", null: false
    rename_column :organizations, :id, :integer_id
    rename_column :organizations, :uuid, :id
    execute "ALTER TABLE organizations drop constraint organizations_pkey;"
    execute "ALTER TABLE organizations ADD PRIMARY KEY (id);"
    remove_column :organizations, :integer_id, :bigint
  end
end
