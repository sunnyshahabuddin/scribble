# frozen_string_literal: true

class AddAuthenticationTokenToWebsite < ActiveRecord::Migration[6.1]
  def change
    add_column :websites, :authentication_token, :string
  end
end
