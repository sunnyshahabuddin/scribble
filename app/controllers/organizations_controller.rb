# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_current_organization!, only: %i[show update create]

  def create
    unless @current_organization.authenticate(params[:password])
      render status: :unauthorized, json: { message: "Invalid password." }
    end
  end

  def show
    render
  end

  def update
    @current_organization.name = params[:name]
    @current_organization.password = params[:password] if params[:password].present?
    @current_organization.is_password_protected = params[:is_password_protected]
    @current_organization.save!
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  private

    def ogranization_params
      params.require(:ogranization).permit(:name, :password, :is_password_protected)
    end
end
