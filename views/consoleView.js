const keyValueController = require('../controllers/keyValueController');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the main menu
function displayMenu() {
    console.log('**************************************************');
    console.log('Welcome to the Enhanced Key-Value Store!');
    console.log('1. Create a key-value pair');
    console.log('2. Read a key-value pair');
    console.log('3. Delete a key-value pair');
    console.log('4. Batch create key-value pairs');
    console.log('5. Exit');
    console.log('**************************************************');
    rl.question('Please select an option: ', (option) => {
        handleMenuOption(option);
    });
}

// Handle the selected menu option
function handleMenuOption(option) {
    switch (option) {
        case '1':
            console.log("Note: The key must be a string (max 32 characters) and the value a JSON object (max 16KB).");
            rl.question('Enter key: ', (key) => {
                rl.question('Enter value (JSON format): ', (value) => {
                    rl.question('Enter TTL in seconds (or press enter for no TTL): ', (ttl) => {
                        const ttlValue = ttl ? parseInt(ttl) : null;
                        try {
                            keyValueController.create(key, JSON.parse(value), ttlValue, displayMenu);
                        } catch (error) {
                            console.error("Invalid input format or constraints violated:", error.message);
                            displayMenu();
                        }
                    });
                });
            });
            break;

        case '2':
            rl.question('Enter key to read: ', (key) => {
                keyValueController.read(key, displayMenu);
            });
            break;
        case '3':
            rl.question('Enter key to delete: ', (key) => {
                keyValueController.deleteKey(key, displayMenu);
            });
            break;
        case '4':
            rl.question('Enter users as JSON (e.g., [{"key":"user1", "value": {"name":"Alice"}, "ttl": 60}, {"key":"user2", "value": {"name":"Bob"}, "ttl": 120}]): ', (input) => {
                try {
                    const users = JSON.parse(input);
                    keyValueController.batchCreate(users, displayMenu);
                } catch (error) {
                    console.error("Invalid input format:", error.message);
                    displayMenu();
                }
            });
            break;
        case '5':
            console.log('Exiting the application. Goodbye!');
            rl.close(); // Close the readline interface
            break;
        default:
            console.log("*_____________________________________________________*");
            console.log('Invalid option. Please try again.');
            console.log("*_____________________________________________________*");
            displayMenu(); // Show menu again
            break;
    }
}

module.exports = {
    displayMenu
};
