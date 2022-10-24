# frozen_string_literal: true

json.extract! @current_organization, :id, :name, :password_digest, :is_password_protected
