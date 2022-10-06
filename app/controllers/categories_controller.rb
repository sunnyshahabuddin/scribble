# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.select(:id, :name)
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    category.save!
    render status: :ok, json: { notice: "Category was successfully created" }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
