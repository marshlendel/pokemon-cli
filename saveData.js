import fs from "fs/promises";
import fetch from 'node-fetch'
import path from "path";

const saveData = async (data, options) => {
  if (options.length) {
    if (options.includes("Stats")) {
      console.log("download stats");
    }
    if (options.includes("Sprites")) {
        const sprites = getSprites(data)
        sprites.forEach(([spriteName, url]) => {
            downloadPicture(data.name, spriteName, url)
        })
    }
    if (options.includes("Artwork")) {
      console.log("download artwork!");
    }
  } else {
    console.log("You didn't select anything to download!");
  }
};

const getSprites = (data) => {
    return Object.entries(data.sprites).filter(([spriteName, url]) =>  (spriteName.includes('front') || spriteName.includes('back')) && url)
}

const downloadPicture = async (name, fileName, url) => {
    try {
      const res = await fetch(url);
      const imageData = await res.arrayBuffer();
      const buffer = Buffer.from(imageData);
      await fs.mkdir(name, {recursive: true})
      await fs.writeFile(`./${name}/${fileName}.png`, buffer);
      console.log(`${fileName}.png downloaded!`)
    } catch (err) {
      console.error(err);
    }
  };
  
export default saveData;
