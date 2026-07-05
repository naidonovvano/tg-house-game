CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,

    telegram_id VARCHAR(64) UNIQUE NOT NULL,

    username VARCHAR(255),

    total_score INTEGER DEFAULT 0
);