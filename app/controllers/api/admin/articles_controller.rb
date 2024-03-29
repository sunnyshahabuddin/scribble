# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy versions position_update]

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

  def position_update
    @article.insert_at(params[:destination].to_i)
    respond_with_success(t("position_successfully_updated", entity: Article))
  end

  def move_articles
    Api::Admin::MoveArticlesService.new(current_user, params[:category_id], params[:article_ids]).process
    respond_with_success(t("successfully_moved", entity: Article))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: Article))
  end

  def destroy
    @article.remove_from_list
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
    @articles_count = current_user.draft_articles_count + current_user.published_articles_count
    @draft_articles_count = current_user.draft_articles_count
    @published_articles_count = current_user.published_articles_count
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id, :user_id, :restored_at)
    end
end
