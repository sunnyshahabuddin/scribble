# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website!, only: %i[show update]

  def create
    @website = Website.first
    unless @website.authenticate(params[:password])
      render status: :unauthorized, json: { message: "Invalid password." }
    end
  end

  def show
    @website = Website.first
    render
  end

  def update
    website = Website.first
    website.name = params[:name]
    website.password = params[:password] if params[:password].present?
    website.is_password_protected = params[:is_password_protected]
    website.save!
    render status: :ok, json: { message: "Website updated successfully." }
  end

  private

    def load_website!
      @website = Website.first
    end

    def website_params
      params.require(:website).permit(:name, :password, :is_password_protected)
    end
end
