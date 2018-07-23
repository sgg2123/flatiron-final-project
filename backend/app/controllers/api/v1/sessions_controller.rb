class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params["username"])
    # secret_key = secret_key()

    # puts 'login'
    # byebug

    if (@user && @user.authenticate(params["password"]))
      # payload = { name: params["username"], id: @user.id }

      render json: {
        username: @user.username,
        id: @user.id,
        token: get_token(payload(@user.username, @user.id))
      }
    else
      render json: {
        errors: "Those credentials don't match anything we have in our database"
      }, status: :unauthorized
    end
  end

end
