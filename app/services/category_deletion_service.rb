 # frozen_string_literal: true

 class CategoryDeletionService
   attr_accessor :category_id, :new_category_id, :_current_user

   def initialize(category_id, new_category_id, current_user)
     @_current_user = current_user
     @category_id = category_id
     @new_category_id = new_category_id
   end

   def process
     if @_current_user.categories.count == 1
       if Category.find_by!(id: category_id).name == "General"
         return nil
       end

       new_category = Category.create(name: "General", user_id: @_current_user.id)
       self.new_category_id = new_category.id
     end
     update
     destroy
   end

   def update
     @_current_user.articles.update(category_id: new_category_id)
   end

   def destroy
     category = @_current_user.categories.find(category_id)
     category.destroy!
   end
 end
