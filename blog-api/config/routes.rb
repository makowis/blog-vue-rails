Rails.application.routes.draw do
  post 'refresh', controller: :refresh, action: :create
  post 'signin', controller: :signin, action: :create
  get 'auth_user', controller: :auth_user, action: :show
  post 'signup', controller: :signup, action: :create
  delete 'signin', controller: :signin, action: :destroy

  resources :articles do
    resources :comments
  end
  resources :users do
    resources :articles, only: [:index]
  end
end
