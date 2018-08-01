class AddCityToCampgrounds < ActiveRecord::Migration[5.2]
  def change
    add_column :campgrounds, :city, :string
  end
end
