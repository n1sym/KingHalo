require "json"
require 'mechanize'

def main
    agent = Mechanize.new
    url = "https://db.netkeiba.com/?pid=horse_select&id=1995104427&year=2021&mode=en&type=bms&course=&page=1"
    page = agent.get(url)
    table = page.xpath('//table[@class="nk_tb_common race_table_01"]/tr')
    result = []
    table.each_with_index do |tr,i|
        next if i==0
        date = tr.css('td')[0].text
        race_name = tr.css('td')[4].css('a')[0].text
        race_url = "https://db.netkeiba.com" + tr.css('td')[4].css('a')[0][:href]
        odds_rank = tr.css('td')[10].text
        rank = tr.css('td')[11].text
        horse_name = tr.css('td')[12].css('a')[0].text
        horse_url = "https://db.netkeiba.com" + tr.css('td')[12].css('a')[0][:href]
        jockey = tr.css('td')[13].css('a')[0].text
        course = tr.css('td')[15].text
        result << {
            date: date,
            race_name: race_name, 
            race_url: race_url, 
            odds_rank: odds_rank, 
            rank: rank, 
            horse_name: horse_name, 
            horse_url: horse_url, 
            jockey: jockey, 
            course: course
        }
    end

    File.open("result.json","w") {|file| 
        file.puts(JSON.generate(result))
    }
end

main()