# frozen_string_literal: true

class Api::Admin::SchedulesController < ApplicationController
  before_action :load_schedule!, only: %i[show update destroy]

  def index
    @schedules = Schedule.all
  end

  def create
    Schedule.create!(schedule_params)
    respond_with_success(t("successfully_created", entity: Schedule))
  end

  def update
    @schedule.update!(schedule_params)
    respond_with_success(t("successfully_updated", entity: Schedule))
  end

  private

    def load_schedule!
      @schedule = Schedule.find(params[:id])
    end

    def schedule_params
      params.require(:schedule).permit(:publish_at, :unpublish_at, :article_id)
    end
end
