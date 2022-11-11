 # frozen_string_literal: true

 class Api::Admin::CategoryDeletionService
   attr_accessor :category_id, :new_category_id, :current_user

   def initialize(category_id, new_category_id, current_user)
     @current_user = current_user
     @category_id = category_id
     @new_category_id = new_category_id
   end

   def process
     if current_user.categories.count == 1 && Category.find_by!(id: category_id).name == "General"
       return nil
     elsif current_user.categories.count == 1
       new_category = Category.create(name: "General", user_id: current_user.id)
       self.new_category_id = new_category.id
     end

     update
     destroy
   end

   def update
     current_user.articles.where(category_id: category_id).update(category_id: new_category_id)
   end

   def destroy
     category = current_user.categories.find(category_id)
     category.destroy!
   end
 end
