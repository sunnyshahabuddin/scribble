# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do

    resources :articles, only: %i[index], param: :id do
      collection do
        get :list_published
      end
    end
    resources :articles, except: %i[new edit update index], param: :id
    resources :articles, only: :update, param: :id do
      collection do
        put :batch_update
      end
    end

    resources :categories, only: %i[index create destroy show]
    resources :categories, only: :update do
      collection do
        put :position_update
      end
    end

    resource :organization, only: %i[create update show]
    resource :user, only: %i[show destroy]
    resources :redirections, only: %i[create index update destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
