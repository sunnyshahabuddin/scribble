# frozen_string_literal: true

class Api::Admin::MoveArticlesService
  attr_reader :category_id, :article_ids, :current_user

  def initialize(current_user, category_id, article_ids)
    @current_user = current_user
    @category_id = category_id
    @article_ids = article_ids
  end

  def process
    remove_articles_from_category
    update_articles
  end

  private

    def remove_articles_from_category
      articles = current_user.articles.where(id: article_ids)
      articles.each do |article|
        current_user.articles.find(article.id).remove_from_list
      end
    end

    def update_articles
      articles = current_user.articles.where(id: article_ids)
      articles.update(category_id: category_id)
    end
end
