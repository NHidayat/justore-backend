import db from '../configs/database.js'

const createTables = async () => {
  try {
    await db.tx(async (t) => {
      await t.none(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          sku VARCHAR(100) NOT NULL UNIQUE,
          image TEXT,
          price NUMERIC(10, 2) NOT NULL,
          description TEXT,
          stock INT DEFAULT 0,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

      await t.none(`
        CREATE TABLE IF NOT EXISTS transactions (
          id SERIAL PRIMARY KEY,
          transaction_id VARCHAR(100) NOT NULL UNIQUE,
          total_amount NUMERIC(10, 2) NOT NULL,
          receiver_phone VARCHAR(16) NOT NULL,
          receiver_name VARCHAR(255) NOT NULL,
          receiver_address TEXT NOT NULL,
          is_deleted BOOLEAN DEFAULT FALSE,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)

      await t.none(`
        CREATE TABLE IF NOT EXISTS transactions_items (
          id SERIAL PRIMARY KEY,
          transaction_id VARCHAR(100) NOT NULL,
          sku VARCHAR(100) NOT NULL,
          qty INT NOT NULL,
          amount NUMERIC(10, 2) NOT NULL,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
        );
      `)
    })
  } catch (error) {
    console.error('Error creating tables:', error)
  } finally {
    console.log('Tables created successfully')
  }
}

createTables()
