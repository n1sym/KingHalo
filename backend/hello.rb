require "json"

arr = []
5.times do |i|
    arr << hash = { "name": "user#{i+1}", "age": 19+i }
end
File.open("test.json","w") {|file| 
  file.puts(JSON.generate(arr))
}