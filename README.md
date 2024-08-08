# Pantry Tracker App

## Overview
The Pantry Tracker App is a web application designed to help users manage their pantry inventory. It provides functionalities to add, remove, and search for items in the inventory. The app uses Firebase Firestore for database operations and Material-UI for the user interface.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [State Variables](#state-variables)
  - [Helper Functions](#helper-functions)
  - [Firestore Functions](#firestore-functions)
  - [Modal Handlers](#modal-handlers)
  - [App Design](#app-design)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pantry-tracker-app.git
   cd pantry-tracker-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project.
   - Set up Firestore in your Firebase project.
   - Replace the Firebase configuration in the `firebase.js` file with your project's configuration.

4. Start the application:
   ```bash
   npm run dev
   ```

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Use the "Add New Item" button to add items to your pantry.
3. Use the "Custom Add" button to add a specific quantity of an item.
4. Use the "Custom Remove" button to remove a specific quantity of an item.
5. Use the search bar to find and manipulate items in the inventory.

## Components

### State Variables
- `inventory`: Holds the list of items in the pantry.
- `itemName`: Holds the name of the item to be added or removed.
- `itemQuantity`: Holds the quantity of the item to be added or removed.
- `openAdd`, `openCustomAdd`, `openCustomRemove`, `openSearch`: Booleans to control the visibility of modals.
- `itemExists`: Checks if an item exists in the inventory.

### Helper Functions
- `updateInventory()`: Fetches the inventory from Firestore and updates the `inventory` state variable.
- `checkItemExists(item)`: Checks if an item exists in Firestore and updates the `itemExists` state variable.

### Firestore Functions
- `addItem(item)`: Adds a single unit of an item to the inventory.
- `addMultipleItems(item, amount)`: Adds a specific quantity of an item to the inventory.
- `removeItem(item)`: Removes a single unit of an item from the inventory.
- `removeMultipleItems(item, amount)`: Removes a specific quantity of an item from the inventory.

### Modal Handlers
- `handleOpenAdd`, `handleCloseAdd`: Handles opening and closing of the add item modal.
- `handleOpenCustomAdd`, `handleCloseCustomAdd`: Handles opening and closing of the custom add modal.
- `handleOpenCustomRemove`, `handleCloseCustomRemove`: Handles opening and closing of the custom remove modal.
- `handleOpenSearch`, `handleCloseSearch`: Handles opening and closing of the search modal.

### App Design
The main components of the app are structured as follows:

1. **Header**: Displays the title "Pantry Tracker App".
2. **Main Stack**: Contains buttons to add, custom add, and custom remove items.
3. **Search Bar**: Allows users to search for items in the inventory.
4. **Inventory Display**: Shows the list of items and their quantities with options to add or remove individual items.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.
