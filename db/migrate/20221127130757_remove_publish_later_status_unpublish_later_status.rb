# frozen_string_literal: true

class RemovePublishLaterStatusUnpublishLaterStatus < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :publish_later_status
    remove_column :articles, :unpublish_later_status
  end
end
