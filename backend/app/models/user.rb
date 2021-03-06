class User < ApplicationRecord
  has_many :interests
  has_many :campgrounds, through: :interests

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
