# frozen_string_literal: true

class AddIsPasswordProtectedToWebsite < ActiveRecord::Migration[6.1]
  def change
    add_column :websites, :is_password_protected, :boolean, default: false
  end
end
