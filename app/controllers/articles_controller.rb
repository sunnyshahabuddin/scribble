# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :current_user!, except: %i[new edit]
  before_action :load_article!, only: %i[show update destroy versions]

  def index
    @articles = @_current_user.articles.order("updated_at DESC")
    @articles = ArticleFilterationService.new(
      @articles, params[:search_filter], params[:status_filter],
      params[:category_filter]).process
    render
  end

  def list_published
    @articles = @_current_user.articles.where(status: 1).order("updated_at DESC")
    render
  end

  def create
    article = @_current_user.articles.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: Article))
  end

  def show
    render
  end

  def show_with_slug
    @article = @_current_user.articles.find_by!(slug: params[:slug])
    @article.visits = @article.visits + 1
    @article.save!
    render
  end

  def update
    @article.version_status = params[:version_status]
    @article.save!
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: Article))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: Article))
  end

  def versions
    @article_versions = @article.versions
    render
  end

  private

    def load_article!
      @article = @_current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id, :user_id)
    end
end
