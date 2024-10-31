# Key-Value Store Application

A simple and interactive key-value store application built using Node.js. It allows users to create, read, delete, and batch-create key-value pairs, with an option to set time-to-live (TTL) for each key.

## Features

- **Create**: Add a key-value pair with an optional TTL.
- **Read**: Retrieve the value and status of a specified key.
- **Delete**: Remove a key-value pair.
- **Batch Create**: Add multiple key-value pairs at once.
- **Data Persistence**: Stores data in a JSON file for persistence across sessions.
- **Cleanup**: Periodically removes expired keys.

## Project Structure

```plaintext
├── controllers/
│   └── keyValueController.js   # Contains CRUD operations for key-value pairs
├── models/
│   └── KeyValueStore.js        # Defines the data storage and cleanup mechanism
├── views/
│   └── consoleView.js          # Manages interactive console menus
├── .gitignore                  # Specifies files and directories to ignore in git
├── README.md                   # Project documentation
├── package.json                # Project metadata and dependencies
└── index.js                    # Entry point for the application
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Key-Value_File_Store
    ```

2. **Install dependencies**
   ```bash  
   npm install
   ```      

