# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_07_31_104445) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campgrounds", force: :cascade do |t|
    t.string "contract_id"
    t.string "facility_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "facility_name"
    t.string "city"
    t.string "state"
  end

  create_table "interests", force: :cascade do |t|
    t.boolean "visited"
    t.text "review"
    t.bigint "user_id"
    t.bigint "campground_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "facility_name"
    t.string "city"
    t.string "state"
    t.index ["campground_id"], name: "index_interests_on_campground_id"
    t.index ["user_id"], name: "index_interests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "interests", "campgrounds"
  add_foreign_key "interests", "users"
end
