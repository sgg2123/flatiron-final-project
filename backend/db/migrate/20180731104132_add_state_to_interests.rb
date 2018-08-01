class AddStateToInterests < ActiveRecord::Migration[5.2]
  def change
    add_column :interests, :state, :string
  end
end
