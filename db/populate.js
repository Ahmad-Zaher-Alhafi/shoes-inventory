const { Client } = require("pg");

const shoesSQL = `
CREATE TABLE IF NOT EXISTS shoes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gender VARCHAR ( 255 )
);

INSERT INTO shoes (gender) 
VALUES
  ('Man'),
  ('Woman'),
  ('Child');

CREATE TABLE IF NOT EXISTS shoe (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gender_id INTEGER,
  type VARCHAR ( 255 ),
  size INTEGER,
  price INTEGER,
  FOREIGN KEY (gender_id) REFERENCES shoes (id)
);

INSERT INTO shoe (gender_id, type, size, price) 
VALUES
  (1, 'Sport', 43, 2500),
  (1, 'Classic', 45, 3000),
  (1, 'Fliplop', 42, 1500),
  (2, 'Sport', 37, 3000),
  (2, 'Classic', 39, 35000),
  (2, 'Fliplop', 38, 1500),
  (3, 'Sport', 28, 5000),
  (3, 'Classic', 32, 4000),
  (3, 'Fliplop', 25, 1000);

  `;

async function main() {
  console.log("seeding...");

  const client = new Client({
    connectionString:
      "postgresql://shoes_inventory_owner:C3k6fUrHZoIa@ep-noisy-violet-a2qxy012.eu-central-1.aws.neon.tech/shoes_inventory?sslmode=require",
  });

  await client.connect();
  await client.query(shoesSQL);
  await client.end();

  console.log("done");
}

main();
