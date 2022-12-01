# frozen_string_literal: true

class ScheduleValidator < ActiveModel::Validator
  include ActionView::Helpers::TranslationHelper

  def validate(record)
    if record.publish_at.present? && record.publish_at < Time.zone.now
      record.errors.add(:publish_at, t("schedule.before_time"))
    end

    if record.unpublish_at.present? && record.unpublish_at < Time.zone.now
      record.errors.add(:unpublish_at, t("schedule.before_time"))
    end

    if record.publish_at.present? && record.unpublish_at.present? && record.unpublish_at < record.publish_at
      record.errors.add(:unpublish_at, t("schedule.unpublish_before"))
    end

    if record.publish_at.present? && record.unpublish_at.present? && record.publish_at < record.unpublish_at
      record.errors.add(:publish_at, t("schedule.publish_before"))
    end
  end
end
