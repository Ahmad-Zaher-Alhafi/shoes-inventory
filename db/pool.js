const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString:
    "postgresql://shoes_inventory_owner:C3k6fUrHZoIa@ep-noisy-violet-a2qxy012.eu-central-1.aws.neon.tech/shoes_inventory?sslmode=require",
});
