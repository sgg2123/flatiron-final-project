class AddStateToCampgrounds < ActiveRecord::Migration[5.2]
  def change
    add_column :campgrounds, :state, :string
  end
end
