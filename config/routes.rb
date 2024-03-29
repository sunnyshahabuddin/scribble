# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      namespace :admin do
        resources :articles, except: %i[new edit] do
          get :list_published, :total_count, on: :collection
          get :versions, on: :member
          put :position_update, on: :member
          put :move_articles, on: :collection
        end
        resources :categories, except: %i[new edit] do
          put :position_update, on: :member
        end
        resource :organization, only: %i[create update show]
        resources :schedules, only: %i[index create update]
        resources :redirections, only: %i[create index update destroy]
      end

      namespace :public do
        resources :categories, only: :index
        resources :articles, only: %i[index show], param: :slug
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
