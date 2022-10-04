# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update]

  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "Article was successfully created" }
  end

  def show
    respond_with_json({ article: @article })
  end

  def update
    @article.update!(article_params)
    respond_with_success("Article was successfully updated!")
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit(:title, :body, :status)
    end
end
