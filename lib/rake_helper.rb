require "rubygems"
require 'time'

module RakeHelper
  def self.date_time
    begin
      time = ENV['date'] ? Time.parse(ENV['date']) : Time.now
      date = time.strftime('%Y-%m-%d')
      
      # Determine NZ timezone offset
      # Check if DST is active (NZDT = +13:00, NZST = +12:00)
      month = time.month
      # NZDT: October through March (months 10, 11, 12, 1, 2, 3)
      # NZST: April through September (months 4, 5, 6, 7, 8, 9)
      tz_offset = (month >= 10 || month <= 3) ? "+13:00" : "+12:00"
      
      date_time = time.strftime("%Y-%m-%d %H:%M:%S") + " #{tz_offset}"
      return date, date_time
    rescue Exception => e
      puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
      exit -1
    end
  end

  def self.check_filename(directory, filename_schema)
    filename = File.join(CONFIG[directory], filename_schema)
    if File.exist?(filename)
      abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
    end
    return filename
  end
end
