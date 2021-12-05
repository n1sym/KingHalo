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

def main(date)
  puts "start scrape"
  caps = [
    selenium_options,
    selenium_capabilities_chrome
  ]
  driver = Selenium::WebDriver.for(:remote, capabilities: caps, url: "http://localhost:4444/wd/hub")
  driver.manage.timeouts.implicit_wait = 30
  driver.navigate.to "https://race.netkeiba.com/top/race_list.html?kaisai_date=#{date}"
  puts driver.title
  elements = driver.find_elements(:xpath, '//dl[@class="RaceList_DataList"]/dd/ul/li/a')
  race_url_list = []
  elements.each do |e|
    race_url_list << e.attribute("href").gsub(/[^\d]/, "").to_i
  end
  race_url_list.uniq!
  puts "finished scrape race_url_list"

  agent = Mechanize.new
  horse_url_list = []
  hash = {}
  race_url_list.each do |url|
    sleep 1
    page = agent.get("https://race.netkeiba.com/race/shutuba.html?race_id=#{url}&rf=race_list")
    elements = page.xpath('//span[@class="HorseName"]/a')
    name = page.xpath('//div[@class="RaceName"]').text.split("\n")[0]
    elements.each do |e|
      horse_url = e.attribute("href").value
      horse_url_list << horse_url
      hash[horse_url] = {id: url, name: name}
    end
  end
  puts "finished scrape horse_url_list"

  halo_list = []
  horse_url_list.each do |url|
    sleep 1
    page = agent.get(url)
    b_ml_2 = page.xpath('//td[@class="b_ml"]')[2].css("a").text
    if b_ml_2 == "キングヘイロー"
      puts "hello!"
      b_ml = page.xpath('//td[@class="b_ml"]')[0].css("a").text
      b_fml = page.xpath('//td[@class="b_fml"]')[1].css("a").text
      name = page.xpath('//div[@class="horse_title"]').css('h1').text.strip.gsub(/[[:space:]]/, '')
      age = page.xpath('//div[@class="horse_title"]').css('p').text.split("　")[1]
      color = page.xpath('//div[@class="horse_title"]').css('p').text.split("　")[2].strip.gsub(/[[:space:]]/, '')
      halo_list << {
        horse_name: name,
        horse_url: url,
        horse_age: age,
        horse_color: color,
        b_ml: b_ml,
        b_ml_2: b_ml_2,
        b_fml: b_fml,
        race_name: hash[url][:name],
        race_id: hash[url][:id]
      }
    end
  end
  halo_list
end

arr = []
date = Date.today + 1
halo_list = main(date.to_s.gsub("-",""))
arr << {date: date, list: halo_list}

date += 1
halo_list2 = main(date.to_s.gsub("-",""))
arr << {date: date, list: halo_list2}

File.open("halo.json","w") {|file| 
  file.puts(JSON.generate(arr))
}