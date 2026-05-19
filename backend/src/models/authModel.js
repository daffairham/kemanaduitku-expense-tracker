const db = require("../config/database");

const createUser = async (name, email, hashedPassword) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [name, email, hashedPassword];

  const result = await db.query(query, values);

  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  const result = await db.query(query, [email]);

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
