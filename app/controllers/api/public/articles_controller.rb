# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :current_user!, only: %i[index show]

  def index
    @articles = @_current_user.articles.where(status: 1).order("updated_at DESC")
    render
  end

  def show
    @article = @_current_user.articles.find_by!(slug: params[:slug])
    @article.visits = @article.visits + 1
    @article.save!
    render
  end
end
