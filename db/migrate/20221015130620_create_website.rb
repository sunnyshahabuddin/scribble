# frozen_string_literal: true

class CreateWebsite < ActiveRecord::Migration[6.1]
  def change
    create_table :websites do |t|
      t.string :name, null: false
      t.string :password_digest
      t.timestamps
    end
  end
end
