# frozen_string_literal: true

class AddUniqueIndexForRedirectionFrom < ActiveRecord::Migration[6.1]
  def change
    add_index :redirections, :from, unique: true
  end
end
