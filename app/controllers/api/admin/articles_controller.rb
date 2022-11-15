# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy versions]

  def index
    @articles = Api::Admin::ArticleFilterationService.new(
      current_user.articles, params[:search_filter], params[:status_filter],
      params[:category_filter]).process
    @articles = @articles.order("updated_at DESC").page(params[:page_number])
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: Article))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: Article))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: Article))
  end

  def versions
    @article_versions = @article.versions
  end

  def list_published
    @articles = current_user.articles.where(status: 1).order("updated_at DESC").page(params[:page_number])
  end

  def total_count
    @articles_count = current_user.articles_count
    @draft_articles_count = current_user.articles.where(status: 0).size
    @published_articles_count = current_user.articles.where(status: 1).size
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id, :user_id, :restored_at)
    end
end
