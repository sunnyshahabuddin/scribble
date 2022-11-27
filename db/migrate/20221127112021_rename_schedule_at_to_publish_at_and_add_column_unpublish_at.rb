# frozen_string_literal: true

class RenameScheduleAtToPublishAtAndAddColumnUnpublishAt < ActiveRecord::Migration[6.1]
  def change
    rename_column :articles, :schedule_at, :publish_at
    add_column :articles, :unpublish_at, :datetime
  end
end
