class Api::V1::CampgroundsController < ApplicationController
  # before_action :requires_login, only: [:index]

  def index
    render json: Campground.all
  end
end
