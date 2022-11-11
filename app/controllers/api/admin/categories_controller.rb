# frozen_string_literal: true

class Api::Admin::CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = current_user.categories.order("position ASC")
    render
  end

  def create
    category = current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: Category))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: Category))
  end

  def position_update
    position = 1
    category_id_list = params[:category_id_list]
    category_id_list.each do |index|
      category = current_user.categories.find(index)
      category.position = position
      position = position + 1
      category.save
    end
    respond_with_success(t("position_successfully_updated", entity: Category))
  end

  def destroy
    Api::Admin::CategoryDeletionService.new(params[:id], params[:new_category_id], current_user).process
    respond_with_success(t("successfully_deleted", entity: Category))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
