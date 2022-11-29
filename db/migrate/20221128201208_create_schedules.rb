# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules, id: :uuid do |t|
      t.datetime :publish_at
      t.datetime :unpublish_at
      t.uuid :article_id
      t.timestamps
    end
  end
end
