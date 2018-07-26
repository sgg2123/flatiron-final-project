class Api::V1::CampgroundsController < ApplicationController
  before_action :requires_login

  def index
    render json: Campground.all
  end

  def show
    @campground = Campground.find_by(id: params[:id])
    render json: @campground
  end
end
