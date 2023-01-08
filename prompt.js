import inquirer from "inquirer";
import fetch from "node-fetch";
import saveData from "./saveData.js";

const fetchData = async (userPrompts) => {
  const { name, options } = userPrompts;
  if (name.trim().length) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        saveData(data, options).then(() => searchAgain());
      })
      .catch((err) => {
        if (err instanceof SyntaxError) {
          console.error(`${name} isn't a recognized pokemon!`);
          searchAgain();
        } else {
          console.error(err);
        }
      });
  } else {
    console.log("You didn't enter a Pokémon!");
    searchAgain();
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

const searchAgain = async () => {
  let { answer } = await inquirer.prompt({
    type: "confirm",
    name: "answer",
    message: "Search another Pokémon?"
  });
  if (answer) {
    promptUser();
  } else {
    return;
  }
};

export { promptUser };
