const fs = require('fs');
const path = require('path');

class KeyValueStore {
  constructor(filePath) {
    // Set the file path to data/dataStore.json by default
    this.filePath = filePath || path.join(__dirname, '../data', 'dataStore.json');

    // Ensure the data directory exists
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.data = {};
    this.loadData();
    this.scheduleCleanup();
  }

  // Load initial data
  loadData() {
    if (fs.existsSync(this.filePath)) {
      this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
      this.removeExpiredKeys(); // Clean expired keys on load
    }
  }

  // Save data to file
  saveData() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2)); // Pretty print JSON for readability
  }

  // Create operation with validation
  create(key, value, ttl = null) {
    if (this.data[key]) {
      throw new Error("Key already exists.");
    }
    this.data[key] = {
      value,
      expiry: ttl ? Date.now() + ttl * 1000 : null,
      status: 'active'
    };
    this.saveData();
  }

  // Read operation with TTL check
  read(key) {
    const item = this.data[key];
    if (!item) {
      throw new Error("Key not found.");
    }

    // Check for expiry and update status
    if (item.expiry && Date.now() > item.expiry) {
      item.status = 'expired';
      this.saveData();
      throw new Error("Key has expired.");
    }

    return { value: item.value, status: item.status };
  }

  // Delete operation
  delete(key) {
    if (!this.data[key]) {
      throw new Error("Key not found.");
    }
    delete this.data[key];
    this.saveData();
  }

  // Cleanup expired keys periodically
  scheduleCleanup() {
    setInterval(() => this.removeExpiredKeys(), 60 * 1000); // Every 1 minute
  }

  // Remove expired keys
  removeExpiredKeys() {
    const now = Date.now();
    let modified = false;
    for (const key in this.data) {
      if (this.data[key].expiry && now > this.data[key].expiry) {
        modified = true;
        delete this.data[key]; // Remove expired key
      }
    }
    if (modified) this.saveData(); // Only save if data has changed
  }
}

module.exports = KeyValueStore;
