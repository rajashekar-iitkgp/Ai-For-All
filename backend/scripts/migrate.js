const pool = require('../db');

const migrate = async () => {
    try {
        // Add role column if not exists
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'");
        console.log("Added role column.");

        // Add stripe_customer_id to users
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255)");
        console.log("Added stripe_customer_id to users.");

        // Create subscriptions table
        await pool.query(`CREATE TABLE IF NOT EXISTS subscriptions (
            subscription_id SERIAL PRIMARY KEY,
            user_id UUID REFERENCES users(user_id),
            stripe_sub_id VARCHAR(255) NOT NULL,
            status VARCHAR(50) NOT NULL,
            plan_type VARCHAR(50) DEFAULT 'pro',
            current_period_end TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Ensured subscriptions table exists.");

        // Ensure blogs table exists
        await pool.query(`CREATE TABLE IF NOT EXISTS blogs (
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
        console.log("Ensured blogs table exists.");

        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
};

migrate();
