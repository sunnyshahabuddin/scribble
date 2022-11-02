# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit] do
      collection do
        get :list_published
        put :batch_update
      end
      member do
        get :versions
      end
    end
    resources :articles, only: %i[show], param: :slug do
      member do
        get :show_with_slug
      end
    end

    resources :categories, only: %i[index create destroy]
    resources :categories, only: :update do
      collection do
        put :position_update
      end
    end

    resource :organization, only: %i[create update show]
    resources :redirections, only: %i[create index update destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
