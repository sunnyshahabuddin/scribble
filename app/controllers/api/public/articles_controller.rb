# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :authenticate_end_user_using_x_auth_token

  def index
    @articles = current_user.articles.where(status: 1).order("updated_at DESC")
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    @article.visits.create!
  end
end
