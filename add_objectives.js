const fs = require('fs');
const path = require('path');

const srcDir = "./src";

// 1. Process all index.md files in part01 ~ part04
function processMarkdownFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processMarkdownFiles(fullPath);
        } else if (f === 'index.md') {
            let content = fs.readFileSync(fullPath, 'utf-8');
            if (!content.includes('학습 목표')) {
                // Find the first H1 heading
                const lines = content.split('\n');
                let h1Index = -1;
                let imgIndex = -1;
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].startsWith('# ') && h1Index === -1) {
                        h1Index = i;
                    }
                    if (h1Index !== -1 && i > h1Index && lines[i].startsWith('![')) {
                        imgIndex = i;
                    }
                }

                if (h1Index !== -1) {
                    const insertIndex = imgIndex !== -1 ? imgIndex + 1 : h1Index + 1;
                    const injection = '\n## 🎯 학습 목표\n\n- 이 장에서 배울 핵심 내용을 알아봅시다.\n\n';
                    lines.splice(insertIndex, 0, injection);
                    fs.writeFileSync(fullPath, lines.join('\n'), 'utf-8');
                    console.log(`Updated md: ${fullPath}`);
                }
            }
        }
    }
}

['part01', 'part02', 'part03', 'part04'].forEach(part => {
    processMarkdownFiles(path.join(srcDir, part));
});

// 2. Process YAML files
const yamlFiles = ['part01.yml', 'part02.yml', 'part03.yml', 'part04.yml', 'navigation.yml'];
yamlFiles.forEach(yf => {
    const ymlPath = path.join(srcDir, '_data', yf);
    if (!fs.existsSync(ymlPath)) return;

    let content = fs.readFileSync(ymlPath, 'utf-8');
    const lines = content.split('\n');
    let parentUrl = '';

    // We want to find `url: /partXX/XX_chapter/` and then under `subitems:` insert the 학습목표
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Match parent URL like: `    url: /part01/01_basic/`
        // Make sure we only catch the chapter URLs, which have exactly 3 slashes (e.g. /part01/01_basic/)
        // Actually, just capturing the previous `url:` indented by 4 spaces is reliable.
        if (line.match(/^    url: \/part\d{2}\/[^\/]+\/$/)) {
            parentUrl = line.split('url: ')[1].trim();
        }

        if (line.match(/^    subitems:/)) {
            // Check if the next line is already 학습목표
            if (i + 1 < lines.length && !lines[i + 1].includes('학습목표')) {
                // Need to insert!
                const injection1 = `      - title: "🎯 학습목표"`;
                const injection2 = `        url: ${parentUrl}`;
                lines.splice(i + 1, 0, injection1, injection2);
                i += 2; // skip the injected lines
            }
        }
    }

    fs.writeFileSync(ymlPath, lines.join('\n'), 'utf-8');
    console.log(`Updated YAML: ${ymlPath}`);
});

console.log("Done adding 학습목표");
