const { Pool } = require("pg");

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString:
    "postgresql://zaherha:a123a123@localhost:5432/shoes_inventory",
});
