const KeyValueStore = require('../models/KeyValueStore');

const store = new KeyValueStore('.data/dataStore.json');

// Create operation
async function create(key, value, ttl, callback) {
    const { default: chalk } = await import('chalk');
    try {
      // Check if key length exceeds 32 characters
      if (typeof key !== 'string' || key.length > 32) {
        throw new Error("Key must be a string and should not exceed 32 characters.");
      }
  
      // Check if value size exceeds 16KB (16,384 bytes)
      const valueSize = Buffer.byteLength(JSON.stringify(value), 'utf8');
      if (valueSize > 16384) {
        throw new Error("Value size exceeds 16KB.");
      }
  
      // Attempt to create the key-value pair
      store.create(key, value, ttl);
      console.log(chalk.green(`Key-value pair created: ${key} => ${JSON.stringify(value)}`));
    } catch (error) {
      console.error(chalk.red("Create Error:"), error.message);
    } finally {
      callback();
    }
  }
  

// Read operation
async function read(key, callback) {
  const { default: chalk } = await import('chalk');
  try {
    const { value, status } = store.read(key);
    console.log(chalk.blue(`Retrieved value for ${key}:`), value);
    console.log(`Status: ${status}`);
  } catch (error) {
    console.error(chalk.red("Read Error:"), error.message);
  } finally {
    callback();
  }
}

// Delete operation
async function deleteKey(key, callback) {
  const { default: chalk } = await import('chalk');
  try {
    store.delete(key);
    console.log(chalk.yellow(`Key-value pair for ${key} deleted.`));
  } catch (error) {
    console.error(chalk.red("Delete Error:"), error.message);
  } finally {
    callback();
  }
}

// Batch create operation
async function batchCreate(users, callback) {
  const { default: chalk } = await import('chalk');
  users.forEach(({ key, value, ttl }) => {
    create(key, value, ttl, () => {});
  });
  console.log(chalk.green("Batch creation successful."));
  callback();
}

module.exports = {
  create,
  read,
  deleteKey,
  batchCreate
};
