class Api::V1::InterestsController < ApplicationController
  before_action :requires_login

  def index
    render json: Interest.all
  end

  def create
    if Interest.find_by(user_id: params[:user_id], campground_id: params[:campground_id])
      render json: { message: 'Already saved!' }
    else
      @interest = Interest.new

      @interest.user_id = params[:user_id]
      @interest.campground_id = params[:campground_id]
      @interest.facility_name = params[:facility_name]
      @interest.city = params[:city]
      @interest.state = params[:state]

      if (@interest.save)
        render json: {
          user_id: @interest.user_id,
          campground_id: @interest.campground_id,
          facility_name: @interest.facility_name,
          message: 'Campground saved!',
        }
      else
        render json: {
          errors: @interest.errors.full_messages
        }, status: :unprocessable_entity
      end
    end
  end
end
