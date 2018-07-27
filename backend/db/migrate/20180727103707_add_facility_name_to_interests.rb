class AddFacilityNameToInterests < ActiveRecord::Migration[5.2]
  def change
    add_column :interests, :facility_name, :string
  end
end
