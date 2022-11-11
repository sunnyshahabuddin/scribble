# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  def index
    @articles = current_user.articles.where(status: 1).order("updated_at DESC")
    render
  end

  def show
    @article = current_user.articles.find_by!(slug: params[:slug])
    visit = @article.visits.create!(visits: 1)
    render
  end
end
