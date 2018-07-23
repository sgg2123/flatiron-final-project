class CreateCampgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :campgrounds do |t|
      t.string :contract_id
      t.string :facility_id

      t.timestamps
    end
  end
end
