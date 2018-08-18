class AuthUserController < ApplicationController
  before_action :authorize_access_request!, only: [:show]

  def show
    render json: current_user , only: [:id, :name]
  end
end