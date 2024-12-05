const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString:
    "postgresql://shoes_inventory_owner:C3k6fUrHZoIa@ep-wispy-salad-a2g0z9ld-pooler.eu-central-1.aws.neon.tech/shoes_inventory?sslmode=require",
});
