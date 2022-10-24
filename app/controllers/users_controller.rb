# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :load_current_user!, only: %i[show]

  def show
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy!
  end
end
