class Campground < ApplicationRecord
  has_many :users, through: :interests
end
