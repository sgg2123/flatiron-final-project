class Api::V1::InterestsController < ApplicationController
  # before_action :requires_login, only: [:index, :create]

  def index
    render json: Interest.all
  end

  def create
    @interest = Interest.new

    @interest.user_id = params[:user_id]
    @interest.campground_id = params[:campground_id]

    if (@interest.save)
      render json: {
        user_id: @interest.user_id,
        campground_id: @interest.campground_id,
      }
    else
      render json: {
        errors: @interest.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
