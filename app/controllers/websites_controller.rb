# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website!, only: %i[update index]

  def index
    @websites = Website.all
    render
  end

  def update
    @website.update!(website_params)
    render status: :ok, json: { message: "Articles are updated successfully." }
  end

  private

    def load_website!
      @website = Website.first
    end

    def website_params
      params.require(:website).permit(:name, :password_digest)
    end
end
