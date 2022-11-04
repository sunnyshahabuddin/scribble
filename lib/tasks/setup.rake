# frozen_string_literal: true

require "yaml"

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Done! Sample data has been added."
  end
end

def create_sample_data!
  create_sample_organization_name!
  create_sample_user!
  create_sample_categories!
  create_sample_articles!
end

def create_sample_categories!
  puts "Seeding with sample category..."
  categories = YAML.load_file("lib/assets/categories.yml")
  for category in categories
    Category.create!(category)
  end
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

def create_sample_articles!
  puts "Seeding with sample article..."
  articles = YAML.load_file("lib/assets/articles.yml")
  for article in articles
    Article.create!(article)
  end
  puts "Done! Sample articles created."
end
