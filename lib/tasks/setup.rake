# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_organization_name!
    create_sample_user!
    create_sample_category!
    puts "Done! Sample data added."
  end
end

def create_sample_category!
  puts "Seeding with sample category..."
  Category.create!(
    name: "Electronics",
    user_id: 1
  )
  puts "Done! Category Electronics created."
end

def create_sample_user!
  puts "Seeding with default users..."
  User.create!(
    name: "Oliver Smith",
    email: "oliver@example.com",
    organization_id: 1
  )
  puts "Done! User Oliver Smith created."
end

def create_sample_organization_name!
  puts "Seeding with sample oragnization name and password..."
  Organization.create!(
    name: "Spinkart",
    password: "welcome123"
  )
  puts "Done! Oragnization Spinkart has been created."
end
