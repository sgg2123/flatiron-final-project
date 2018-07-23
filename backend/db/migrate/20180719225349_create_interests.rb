class CreateInterests < ActiveRecord::Migration[5.2]
  def change
    create_table :interests do |t|
      t.boolean :visited
      t.text :review
      t.references :user, foreign_key: true
      t.references :campground, foreign_key: true

      t.timestamps
    end
  end
end
