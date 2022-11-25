# frozen_string_literal: true

class AddScheduleAtToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :schedule_at, :datetime
  end
end
