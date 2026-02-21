require 'fileutils'

brain_dir = "/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd"

files = [
    "src/part03/14_iterator/index.md",
    "src/part03/12_functional/index.md",
    "src/part03/13_abstract/index.md",
    "src/part04/19_bytes/index.md",
    "src/part04/23_csv/index.md",
    "src/part04/22_json/index.md",
    "src/part04/17_exception/index.md",
    "src/part02/11_decorator/index.md",
    "src/part04/21_xml/index.md",
    "src/part04/16_modules/index.md",
    "src/part04/18_file_io/index.md",
    "src/part04/20_regex/index.md",
    "src/part02/10_special_method/index.md",
    "src/part03/15_property/index.md"
]

File.open("ruby_log.txt", "w") do |log|
  files.each do |filepath|
    if !File.exist?(filepath)
      log.puts("Missing file: #{filepath}")
      next
    end
    
    content = File.read(filepath)
    if content.include?(brain_dir)
      img_dir = File.join(File.dirname(filepath), 'img')
      FileUtils.mkdir_p(img_dir)
      
      content.split("![").drop(1).each do |part|
        if part.include?("](" + brain_dir)
          img_name = part.split(brain_dir + "/")[1].split(")")[0]
          src_img = File.join(brain_dir, img_name)
          dest_img = File.join(img_dir, img_name)
          
          if File.exist?(src_img)
            FileUtils.cp(src_img, dest_img)
            log.puts("Copied #{img_name} to #{img_dir}")
          else
            log.puts("Source image missing: #{src_img}")
          end
        end
      end
      
      content = content.gsub(brain_dir + "/", "./img/")
      content = content.gsub(brain_dir, "./img")
      
      File.write(filepath, content)
      log.puts("Fixed #{filepath}")
    else
      log.puts("No match in #{filepath}")
    end
  end
end

puts "Ruby Done"
