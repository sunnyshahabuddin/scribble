# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    association :article, factory: :article
    publish_at { Time.zone.now + 1.hour }
    unpublish_at { Time.zone.now + 1.hour }

  end
end
