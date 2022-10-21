# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_articles!, only: :batch_update

  def index
    @articles = Article.all
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def batch_update
    @articles.update(category_id: params[:updated_category_id])
    render status: :ok, json: { message: "Articles are updated successfully." }
  end

  private

    def load_article!
      @article = Article.find_by!(id: params[:id])
    end

    def load_articles!
      @articles = Article.all.where(category_id: params[:previous_category_id])
    end

    def article_params
      params.require(:article).permit(:title, :body, :status, :category_id)
    end
end
