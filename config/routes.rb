# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit update], param: :slug

    resources :articles, only: :update, param: :slug do
      collection do
        put "batch_update"
      end
    end
    resources :categories, only: %i[index create destroy]
    resources :categories, only: :update do
      collection do
        put "position_update"
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
