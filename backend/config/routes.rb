Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update, :destroy]
      resources :sessions, only: [:create]
      resources :campgrounds, only: [:index, :show, :create]
      resources :interests, only: [:index, :create]
      get 'users/:user_id/interests', to: 'users#user_interests'
    end
  end
end
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
