const pool = require("./pool");

async function getAllShoes() {
  const addQuery = `select shoe.id, shoes.gender, shoe.type, shoe.size, shoe.price from shoes join shoe on shoes.id = shoe.gender_id`;
  const { rows } = await pool.query(addQuery);
  return rows;
}

async function getShoesOfGender(gender) {
  const addQuery = `select shoe.id, shoes.gender, shoe.type, shoe.size, shoe.price from shoes join shoe on shoes.id = shoe.gender_id where gender = $1`;
  const { rows } = await pool.query(addQuery, [gender]);
  return rows;
}

async function getShoe(id) {
  const addQuery = `select shoe.id, shoes.gender, shoe.type, shoe.size, shoe.price from shoes join shoe on shoes.id = shoe.gender_id where shoe.id = $1 limit 1`;
  const { rows } = await pool.query(addQuery, [id]);
  return rows;
}

async function addShoe(gender, type, size, price) {
  const addQuery = `INSERT INTO shoe (gender_id, type, size, price) 
      VALUES
        ((select id from shoes where gender = $1), $2, $3, $4);
        `;

  await pool.query(addQuery, [gender, type, size, price]);
}

async function editShoe(id, gender, type, size, price) {
  const addQuery = `update shoe set gender_id = (select id from shoes where gender = $2), type = $3, size = $4, price = $5 where id = $1`;
  await pool.query(addQuery, [id, gender, type, size, price]);
}

async function deleteShoe(id) {
  const addQuery = `delete from shoe where id = $1`;
  await pool.query(addQuery, [id]);
}

module.exports = {
  getAllShoes,
  getShoesOfGender,
  addShoe,
  editShoe,
  deleteShoe,
  getShoe,
};
