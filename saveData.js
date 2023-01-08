import fs from "fs/promises";
import fetch from "node-fetch";
import path from "path";

const saveData = async (data, options) => {
  if (options.length) {
    if (options.includes("Stats")) {
      const stats = getStats(data);
      downloadStats(data.name, stats);
    }
    if (options.includes("Sprites")) {
      const sprites = getSprites(data);
      sprites.forEach(([spriteName, url]) => {
        downloadPicture(data.name, spriteName, url);
      });
    }
    if (options.includes("Artwork")) {
        const url = data.sprites.other["official-artwork"].front_default
        downloadPicture(data.name, 'original-artwork', url)
    }
  } else {
    console.log("You didn't select anything to download!");
  }
};

const getStats = (data) => {
  const stats = {};

  Object.entries(data.stats).forEach(([, { base_stat, stat }]) => {
    stats[stat.name] = base_stat;
  });

  return `HP: ${stats.hp}
Attack: ${stats.attack}
Defense: ${stats.defense}
Special Attack: ${stats["special-attack"]}
Special Defense: ${stats["special-defense"]}
Speed: ${stats.speed}`;
};

const getSprites = (data) => {
  return Object.entries(data.sprites).filter(
    ([spriteName, url]) =>
      (spriteName.includes("front") || spriteName.includes("back")) && url
  );
};

const downloadPicture = async (name, fileName, url) => {
  try {
    const res = await fetch(url);
    const imageData = await res.arrayBuffer();
    const buffer = Buffer.from(imageData);
    await fs.mkdir(name, { recursive: true });
    await fs.writeFile(`./${name}/${fileName}.png`, buffer);
    console.log(`${fileName}.png downloaded!`);
  } catch (err) {
    console.error(err);
  }
};

const downloadStats = async (name, stats) => {
  try {
    await fs.mkdir(name, { recursive: true });
    await fs.writeFile(`./${name}/stats.text`, stats);
    console.log(`stats.text downloaded!`);
  } catch (err) {
    console.error(err);
  }
};

export default saveData;
