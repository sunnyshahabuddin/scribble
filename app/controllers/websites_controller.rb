# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website!, only: %i[update index]

  def create
    @website = Website.first
    unless @website.authenticate(params[:password])
      render status: :unauthorized, json: { message: "Invalid password." }
    end
  end

  def index
    @websites = Website.all
    render
  end

  def update
    website = Website.first
    website.name = params[:name]
    website.password = params[:password]
    website.save!
    render status: :ok, json: { message: "Website updated successfully." }
  end

  private

    def load_website!
      @website = Website.first
    end

    def website_params
      params.require(:website).permit(:name, :password)
    end
end
