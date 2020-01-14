Rails.application.routes.draw do

  namespace :api do
      resources :agents, only: %i[index show]

    get 'properties', to: 'properties#index'
    get 'cities/:city', to: 'properties#city'
    get 'buyers/:id', to: 'buyers#show'
    get 'properties/city_cost', to: 'properties#city_cost'
  end
end
