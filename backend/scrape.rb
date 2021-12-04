require "json"
require 'selenium-webdriver'
require 'mechanize'
require 'net/http'
require 'uri'

def selenium_options
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--no-sandbox")
  options.add_argument("--headless")
  options.add_argument("--disable-dev-shm-usage")
  options
end

def selenium_capabilities_chrome
  Selenium::WebDriver::Remote::Capabilities.chrome
end

def main
  puts "start scrape"
  caps = [
    selenium_options,
    selenium_capabilities_chrome
  ]
  driver = Selenium::WebDriver.for(:remote, capabilities: caps, url: "http://#{"selenium"}:4444/wd/hub")
  driver.manage.timeouts.implicit_wait = 30
  driver.navigate.to "https://race.netkeiba.com/top/race_list.html"
  return puts driver.title
  elements = driver.find_elements(:xpath, '//dl[@class="RaceList_DataList"]/dd/ul/li/a')
  race_url_list = []
  elements.each do |e|
    race_url_list << e.attribute("href").gsub(/[^\d]/, "").to_i
  end
  race_url_list.uniq!
  puts "finished scrape race_url_list"
  agent = Mechanize.new
  horse_url_list = []
  race_url_list.each do |url|
    sleep 1
    page = agent.get("https://race.netkeiba.com/race/shutuba.html?race_id=#{url}&rf=race_list")
    elements = page.xpath('//span[@class="HorseName"]/a')
    elements.each do |e|
      horse_url_list << e.attribute("href").value
    end
  end
  puts "finished scrape horse_url_list"
  halo_list = []
  horse_url_list.each do |url|
    sleep 1
    page = agent.get(url)
    elements = page.xpath('//table[@class="blood_table"]')
    bloods = elements.text.split(/\n| /)
    bloods.delete("")
    if bloods.include? "キングヘイロー"
      puts "hello!"
      name = page.xpath('//div[@class="horse_title"]').css('h1').text.strip.gsub(/[[:space:]]/, '')
      hash = {
        horse_name: name,
        horse_url: url
      }
      puts hash
      halo_list << hash
    end
  end
  halo_list
end

arr = []
if File.exist?("halo.json")
  File.open("halo.json") do |j|
    arr = JSON.load(j)
  end
end

date = Date.today
halo_list = main()
arr << {date: date, list: halo_list}

File.open("halo.json","w") {|file| 
  file.puts(JSON.generate(arr))
}