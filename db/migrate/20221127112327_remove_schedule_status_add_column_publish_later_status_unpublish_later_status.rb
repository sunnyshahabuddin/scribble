# frozen_string_literal: true

class RemoveScheduleStatusAddColumnPublishLaterStatusUnpublishLaterStatus < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :schedule_status
    add_column :articles, :publish_later_status, :boolean, default: false
    add_column :articles, :unpublish_later_status, :boolean, default: false
  end
end
