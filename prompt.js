import inquirer from "inquirer";
import fetch from "node-fetch";
import saveData from "./saveData.js";

const fetchData = async (userPrompts) => {
  const { name, options } = userPrompts;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    saveData(data, options);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error(`${name} isn't a recognized pokemon!`);
    } else {
      console.error(err);
    }
  }
};

const promptUser = async () => {
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Search a Pokémon:",
    },
    {
      type: "checkbox",
      name: "options",
      message: "Select what to download:",
      choices: ["Stats", "Sprites", "Artwork"],
    },
  ]);
  fetchData(answers);
};

export default promptUser
