# frozen_string_literal: true

class AddScheduleStatusToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :schedule_status, :integer
  end
end
