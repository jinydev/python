require 'fileutils'
require 'find'

src_dir = "./src"

# 1. Update markdown files
count_md = 0
parts = ['part01', 'part02', 'part03', 'part04']
parts.each do |part|
  dir = File.join(src_dir, part)
  Find.find(dir) do |path|
    if path.end_with?('index.md')
      content = File.read(path)
      if !content.include?('학습 목표')
        lines = content.split("\n")
        h1_idx = lines.index { |l| l.start_with?('# ') }
        if h1_idx
          # Check for image immediately following H1
          insert_idx = h1_idx + 1
          lines.each_with_index do |l, i|
            # We assume concept images are adjacent to the H1 heading
            if i > h1_idx && l.start_with?('![') && i <= h1_idx + 3
              insert_idx = i + 1
            end
          end
          
          lines.insert(insert_idx, "", "## 🎯 학습 목표", "", "- 본 문서의 핵심 학습 목표를 설명합니다.", "")
          File.write(path, lines.join("\n") + "\n")
          count_md += 1
        end
      end
    end
  end
end
puts "Updated #{count_md} markdown files."

# 2. Update YAML files
count_yaml = 0
['part01.yml', 'part02.yml', 'part03.yml', 'part04.yml', 'navigation.yml'].each do |yf|
  path = File.join(src_dir, '_data', yf)
  next unless File.exist?(path)
  
  content = File.read(path)
  lines = content.split("\n")
  parent_url = ""
  i = 0
  changed = false
  
  while i < lines.length
    line = lines[i]
    if line.match(/^    url: \/part\d{2}\/[^\/]+\/$/)
      parent_url = line.split("url: ")[1].strip
    end
    
    if line.match(/^    subitems:/)
      if i + 1 < lines.length && !lines[i+1].include?('학습목표')
        lines.insert(i + 1, "      - title: \"🎯 학습목표\"", "        url: #{parent_url}")
        i += 2
        changed = true
      end
    end
    i += 1
  end
  
  if changed
    File.write(path, lines.join("\n") + "\n")
    puts "Updated YAML: #{path}"
    count_yaml += 1
  end
end

puts "Ruby Done Adding Objectives. YAML files fixed: #{count_yaml}"
