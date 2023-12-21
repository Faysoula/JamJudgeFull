const { query } = require("../database/Database");
const moment = require("moment");
const { checkIfIdExists } = require("../helper");

/**
 * Retrieves all song ratings from the database.
 * 
 * @returns {Promise<Array>} An array of song ratings.
 */
const getratingforsong = async () => {
  try {
    let sql = `select * from ratingforsong`;
    const ratingforsong = await query(sql);
    return ratingforsong;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific song rating by its ID.
 * 
 * @param {number} rating_id The ID of the rating to retrieve.
 * @returns {Promise<Object>} The requested rating object.
 */
const getratingforsongid = async (rating_id) => {
  const songexists = await checkIfIdExists(
    "ratingforsong",
    "rating_id",
    rating_id
  );
  if (!songexists) {
    throw new Error(`Rating with ID ${rating_id} does not exist.`);
  }
  try {
    let sql = `select * from ratingforsong where rating_id = ?`;
    const ratingforsong = await query(sql, [rating_id]);
    return ratingforsong;
  } catch (error) {
    throw new Error(error);
  }
};


/**
 * Inserts a new song rating into the database.
 * 
 * @param {string} Rating_title The title of the rating.
 * @param {Date|string} Rating_date The date of the rating.
 * @param {number} user_id The ID of the user who is making the rating.
 * @param {number} songs_id The ID of the song being rated.
 * @param {string} Rating_body The body text of the rating.
 * @returns {Promise<Object>} The newly inserted rating object.
 */
const insertedRatingsongs = async (
  Rating_title,
  Rating_date,
  user_id,
  songs_id,
  Rating_body
) => {
  const userexists = await checkIfIdExists("users", "user_id", user_id);
  if (!userexists) {
    throw new Error(`User with ID ${user_id} does not exist.`);
  }

  const songs_exists = await checkIfIdExists("songs", "songs_id", songs_id);
  if (!songs_exists) {
    throw new Error(`Song with ID ${songs_id} does not exist.`);
  }
  try {
    let sql = `insert into ratingforsong (Rating_title, Rating_date, user_id, songs_id, Rating_body) values (?,?,?,?,?)`;
    const ratingforsongs = await query(sql, [
      Rating_title,
      moment(Rating_date).format("YYYY-MM-DD"),
      user_id,
      songs_id,
      Rating_body,
    ]);
    let inserteratingforsongs = await query(
      `select * from ratingforsong where rating_id = ?`,
      [ratingforsongs?.insertId]
    );
    return inserteratingforsongs;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing song rating in the database.
 * 
 * @param {number} rating_id The ID of the rating to update.
 * @param {string} Rating_title The new title of the rating.
 * @param {Date|string} Rating_date The new date of the rating.
 * @param {number} user_id The ID of the user updating the rating.
 * @param {number} songs_id The ID of the song being rated.
 * @param {string} Rating_body The new body text of the rating.
 * @returns {Promise<Object>} The result of the update operation.
 */
const updateratingsong = async (
  rating_id,
  Rating_title,
  Rating_date,
  user_id,
  songs_id,
  Rating_body
) => {
  const userexists = await checkIfIdExists("users", "user_id", user_id);
  if (!userexists) {
    throw new Error(`User with ID ${user_id} does not exist.`);
  }

  const songs_exists = await checkIfIdExists("songs", "songs_id", songs_id);
  if (!songs_exists) {
    throw new Error(`Song with ID ${songs_id} does not exist.`);
  }
  try {
    let sql = `update ratingforsong set
  Rating_title = ?,
  Rating_date = ?,
  user_id = ?,
  songs_id = ?,
  Rating_body = ? where rating_id = ?`;

    const ratingsong = await query(sql, [
      Rating_title,
      moment(Rating_date).format("YYYY-MM-DD"),
      user_id,
      songs_id,
      Rating_body,
      rating_id
    ]);

    return ratingsong;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 * Deletes a song rating from the database.
 * 
 * @param {number} rating_id The ID of the rating to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 */
const deleteratingsong = async (rating_id) => {
  try {
    return await query(`delete from ratingforsong where rating_id = ?`, [
      rating_id,
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getratingforsong,
  getratingforsongid,
  insertedRatingsongs,
  updateratingsong,
  deleteratingsong,
};
