# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_user!
    create_sample_category!
    create_sample_article!
    create_sample_website_name!
    puts "Done! Sample data has been added."
  end
end

def create_sample_user!
  puts "Seeding with default users..."
  User.create!(
    name: "Oliver Smith",
    email: "oliver@example.com"
  )
  puts "Done! The default User is now Oliver Smith."
end

def create_sample_category!
  puts "Seeding with default category..."
  Category.create!(
    name: "Getting Started"
  )
  puts "Done! Category Getting Started has been created."
end

def create_sample_article!
  puts "Seeding with default article..."
  Article.create!(
    title: "Welcome to scribble",
    body: "This is the body of welcome to scribble, and is supposed to be a long text",
    category_id: 1
  )
  puts "Done! Article Welcome to scribble has been created."
end

def create_sample_website_name!
  puts "Seeding with sample website name..."
  Website.create!(
    name: "Spinkart"
  )
  puts "Done! Website name Spinkart has been created."
end
