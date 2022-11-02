# frozen_string_literal: true

 json.article_versions @article_versions do |article|
   json.extract! article, :id, :object
 end
