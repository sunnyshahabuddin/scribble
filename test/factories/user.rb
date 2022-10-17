# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { Faker::Name.name[0..49] }
    email { Faker::Internet.email }
    id { 1 }
  end
end
