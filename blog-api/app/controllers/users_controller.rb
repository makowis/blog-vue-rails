class UsersController < ApplicationController
  before_action :authorize_access_request!, only: [:update, :destroy]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users, only: [:id, :name]
  end

  # GET /users/1
  def show
    render json: @user, only: [:id, :name]
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, only: [:id, :name], status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user, only: [:id, :name]
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    if @user == current_user
      @user.destroy
      redirect_to controller: :signin, action: :destroy
    else
      render json: { errors: "Cannot delete" }, status: :bad_request
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name)
    end
end
