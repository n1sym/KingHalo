require "json"

arr = []
3.times do |i|
    arr << hash = { "name": "user#{i+1}", "age": 19+i }
end
File.open("test.json","w") {|file| 
  file.puts(JSON.generate(arr))
}