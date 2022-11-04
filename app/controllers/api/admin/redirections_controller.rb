# frozen_string_literal: true

class Api::Admin::RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = Redirection.all
    render
  end

  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def load_redirection!
      @redirection = Redirection.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end
end
