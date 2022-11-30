# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  def index
    @categories = current_user.categories.order("position ASC")
    @categories = @categories.select { |category| category.articles.where(status: 1).present? }
  end
end
