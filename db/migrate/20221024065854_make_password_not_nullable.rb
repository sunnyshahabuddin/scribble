# frozen_string_literal: true

class MakePasswordNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :organizations, :password_digest, false
  end
end
