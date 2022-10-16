# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :category, factory: :category
    association :user, factory: :user
    title { Faker::Lorem.sentence[0..49] }
    body { Faker::Lorem.paragraph }
    status { 0 }
  end
end
