const { query } = require("./database/Database");
const jwt = require("jsonwebtoken");
/**
 * Checks if a specific ID exists in a given table.
 *
 * @param {string} tableName The name of the table to search in.
 * @param {string} fieldName The field name to match against the ID.
 * @param {number|string} idVal The ID value to search for.
 * @returns {Promise<boolean>} True if the ID exists, false otherwise.
 */
const checkIfIdExists = async (tableName, fieldName, idVal) => {
  const result = await query(
    `SELECT ${fieldName} FROM ${tableName} WHERE ${fieldName} = ${idVal}`,
    [idVal]
  );

  return result.length === 1;
};

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      req.isLoggedIn = true;
    } catch (err) {
      req.isLoggedIn = false;
    }
  } else {
    req.isLoggedIn = false;
  }
  next();
};

module.exports = {
  checkIfIdExists,
  authenticateUser,
};
