# frozen_string_literal: true

class AddDefaultValueToCategoryUserId < ActiveRecord::Migration[6.1]
  def change
    change_column_default :categories, :user_id, 1
  end
end
