# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    if category.save!
      render status: :ok, json: { notice: "Category was successfully created" }
    else
      render status: :unprocessable_entity, json: { notice: "Category already exists" }
    end
  end

  def update
    @category.update!(category_params)
  end

  def destroy
    @category.destroy!
    render status: :ok, json: { notice: "Category was successfully deleted" }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = Category.find(params[:id])
    end
end
