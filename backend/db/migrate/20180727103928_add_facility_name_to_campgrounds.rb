class AddFacilityNameToCampgrounds < ActiveRecord::Migration[5.2]
  def change
    add_column :campgrounds, :facility_name, :string
  end
end
