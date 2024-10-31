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

### Usage
1. **Run the application**
   ```bash  
   node index.js
   ```    
2. **Follow the interactive menu to perform operations like creating, reading, deleting, or batch-creating key-value pairs.**


### Example Usage

#### Create a Key-Value Pair
- Select option `1` in the interactive console and provide:
  - **Key**: A string with a maximum length of 32 characters.
  - **Value**: A JSON object, limited to a size of 16KB.
  - **TTL (Time-To-Live)**: Optional, specify in seconds. Leave blank for no expiration.

#### Read a Key-Value Pair
- Select option `2` in the console and enter the **key** to retrieve its value and status (active or expired).

#### Delete a Key-Value Pair
- Select option `3` and enter the **key** you want to delete from the storage.


#### Batch Create Key-Value Pairs
- Select option `4` and enter multiple key-value pairs in JSON format. 
- Example input for batch creation:
  ```json
  [
    { "key": "user1", "value": { "name": "Alice" }, "ttl": 60 },
    { "key": "user2", "value": { "name": "Bob" }, "ttl": 120 }
  ]
  ```