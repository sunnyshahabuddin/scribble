# frozen_string_literal: true

class Api::Admin::OrganizationsController < ApplicationController
  before_action :current_organization, only: %i[show]

  def create
    unless current_organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credential"), :unauthorized)
    end
  end

  def show
    render
  end

  def update
    current_organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :is_password_protected, :password)
    end
end
