class Api::V1::CampgroundsController < ApplicationController
  before_action :requires_login

  def index
    render json: Campground.all
  end

  def show
    @campground = Campground.find_by(id: params[:id])
    render json: @campground
  end

  def create
    if Campground.find_by(facility_id: params[:facility_id])
      @campground = Campground.find_by(facility_id: params[:facility_id])
    else
      @campground = Campground.new

      @campground.contract_id = params[:contract_id]
      @campground.facility_id = params[:facility_id]
      @campground.facility_name = params[:facility_name]
      @campground.city = params[:city]
      @campground.state = params[:state]
    end

    if (@campground.save)
      render json: {
        campground_id: @campground.id,
        contract_id: @campground.contract_id,
        facility_id: @campground.facility_id,
        facility_name: @campground.facility_name
      }
    else
      render json: {
        errors: @campground.errors.full_messages
      }, status: :unprocessable_entity
    end

  end
end
