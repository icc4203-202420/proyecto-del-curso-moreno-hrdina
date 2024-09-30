class Country < ApplicationRecord
  has_and_belongs_to_many :breweries
  has_many :beers, through: :breweries
end
