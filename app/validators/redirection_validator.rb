# frozen_string_literal: true

class RedirectionValidator < ActiveModel::Validator
  include ActionView::Helpers::TranslationHelper

  def validate(record)
    to_and_from_not_equal(record)
    check_redirection_loop(record)
  end

  private

    def to_and_from_not_equal(record)
      if record.to == record.from
        record.errors.add(:redirection, t("redirection.equal"))
      end
    end

    def check_redirection_loop(record)
      to_path = record.to
      while to_path != record.from
        redirection = Redirection.find_by(from: to_path)
        if redirection != nil && record.from == redirection.to
          record.errors.add(:redirection, t("redirection.cycle"))
        elsif redirection == nil
          break
        end
        to_path = redirection.to
      end
    end
end
