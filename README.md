# Pokemon CLI Downloader

This Node.js application uses the Pokemon API to fetch information about a specific Pokemon based on the user's input. The user can then choose to download various types of data about the Pokemon, including its stats, sprites, and artwork.

## Features

- Allows the user to search for a specific Pokemon using the Pokemon API
- Allows the user to select which data to download about the Pokemon, including:
  - Stats (saved as a text file)
  - Sprites (all available sprites are downloaded at once)
  - Artwork (saved as an image file)
- Creates a new directory with the Pokemon's name to store the downloaded data
- Asks the user if they want to search for another Pokemon after the current search is complete

## Usage

To use this application, run the following command in your terminal:

`node main.js`


You will be prompted to enter the name of a Pokemon and select which data to download. The selected data will be downloaded and saved to the file system.

## Requirements

This application requires Node.js to be installed on your system. It also uses the following npm packages:

- inquirer
- node-fetch
- fs/promises

These packages will be installed automatically when you run `npm install`.
