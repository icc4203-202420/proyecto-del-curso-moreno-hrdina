class AddBreweryRefToBrand < ActiveRecord::Migration[6.1]
  def change
    add_reference :brands, :brewery, null: false, foreign_key: true
  end
end
