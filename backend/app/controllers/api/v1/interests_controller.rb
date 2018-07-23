class Api::V1::InterestsController < ApplicationController
  def index
    render json: Interest.all
  end
end
