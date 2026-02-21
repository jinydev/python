const fs = require('fs');
const path = require('path');

const srcDir = "/Users/hojin8/docs/070.강의/p02_python/src";
const brainDir = "/Users/hojin8/.gemini/antigravity/brain/39fe47ab-9fff-4271-aa37-8b9fbfaf6bdd";

const files = [
    "part03/14_iterator/index.md",
    "part03/12_functional/index.md",
    "part03/13_abstract/index.md",
    "part04/19_bytes/index.md",
    "part04/23_csv/index.md",
    "part04/22_json/index.md",
    "part04/17_exception/index.md",
    "part02/11_decorator/index.md",
    "part04/21_xml/index.md",
    "part04/16_modules/index.md",
    "part04/18_file_io/index.md",
    "part04/20_regex/index.md",
    "part02/10_special_method/index.md",
    "part03/15_property/index.md"
];

for (const f of files) {
    const filepath = path.join(srcDir, f);
    let content = fs.readFileSync(filepath, 'utf-8');

    if (content.includes(brainDir)) {
        const imgDir = path.join(path.dirname(filepath), 'img');
        if (!fs.existsSync(imgDir)) {
            fs.mkdirSync(imgDir, { recursive: true });
        }

        const parts = content.split(brainDir + "/");
        for (let i = 1; i < parts.length; i++) {
            const imgName = parts[i].split(")")[0];
            const srcImg = path.join(brainDir, imgName);
            const destImg = path.join(imgDir, imgName);

            if (fs.existsSync(srcImg)) {
                fs.copyFileSync(srcImg, destImg);
                console.log(`Copied ${imgName}`);
            }
        }

        content = content.split(brainDir).join("./img");
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
    }
}
console.log("Done fixing images via Node");
