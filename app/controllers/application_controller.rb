# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def load_current_organization!
      @current_organization = Organization.first
    end

    def load_current_user!
      current_organization = load_current_organization!
      @current_user = User.where(organization_id: current_organization.id).first
    end
end
