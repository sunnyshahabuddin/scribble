json.websites @websites do |website|
  json.id website.id
  json.name website.name
  json.password website.password_digest
end
