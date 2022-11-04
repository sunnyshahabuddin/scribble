# frozen_string_literal: true

class Api::Admin::RedirectionsController < ApplicationController
  before_action :current_organization!, except: %i[new edit]
  before_action :load_redirection!, only: %i[update destroy]

  def index
    @redirections = @_current_organization.redirections
    render
  end

  def create
    redirection = @_current_organization.redirections.create!(redirection_params)
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
      @redirection = @_current_organization.redirections.find(params[:id])
    end

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end
end
