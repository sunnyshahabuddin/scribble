# frozen_string_literal: true

json.all @articles.count
json.draft @articles.where(status: 0).count
json.published @articles.where(status: 1).count
