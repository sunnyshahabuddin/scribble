# frozen_string_literal: true

class Api::Admin::OrganizationsController < ApplicationController
  before_action :load_current_organization!, only: %i[show update create]

  def create
    unless @current_organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credential"), :unauthorized)
    end
  end

  def show
    render
  end

  def update
    @current_organization.name = params[:name]
    @current_organization.password = params[:password]
    @current_organization.is_password_protected = params[:is_password_protected]
    @current_organization.save!
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  private

    def ogranization_params
      params.require(:ogranization).permit(:name, :password, :is_password_protected)
    end
end
