class Api::V1::UsersController < ApplicationController
  before_action :requires_login, only: [:index, :show, :update, :user_interests, :destroy]
  # before_action :is_admin, only: [:index]

  def index
    render json: User.all
  end

  def show
    @user = User.find_by(id: params[:id])
    render json: @user
  end

  def create
    @user = User.new

    @user.username = params[:username]
    @user.password = params[:password]
    @user.first_name = params[:first_name]
    @user.last_name = params[:last_name]

    if (@user.save)
      render json: {
        username: @user.username,
        id: @user.id,
        token: get_token(payload(@user.username, @user.id))
      }
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(username: params[:username], password: params[:password], first_name: params[:first_name], last_name: params[:last_name])
    render json: {
      id: @user.id,
      username: @user.username,
      first_name: @user.first_name,
      last_name: @user.last_name,
    }
  end

  def user_interests
    @user = User.find_by(id: params[:user_id])

    render json: @user.interests
  end

  def destroy
    @user = User.find_by(id: params[:id])
    @user.destroy
    render json: @user
  end

end
