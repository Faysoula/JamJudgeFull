const { query } = require("../database/Database");
const moment = require("moment");
const { checkIfIdExists } = require("../helper");

/**
 * Retrieves all album ratings from the database.
 * 
 * @returns {Promise<Array>} An array of album ratings.
 */
const getRatingforalbum = async () => {
  try {
    let sql = `select * from ratingforalbum`;
    const ratingalbum = await query(sql);
    return ratingalbum;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific album rating by its ID.
 * 
 * @param {number} rating_id The ID of the rating to retrieve.
 * @returns {Promise<Object>} The requested rating object.
 */
const getRatingforalbumId = async (rating_id) => {
  const albumexists = await checkIfIdExists(
    "ratingforalbum",
    "rating_id",
    rating_id
  );
  if (!albumexists) {
    throw new Error(`Rating with ID ${rating_id} does not exist.`);
  }
  try {
    let sql = `select * from ratingforalbum where rating_id = ?`;
    const ratingalbum = await query(sql, [rating_id]);
    return ratingalbum;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Inserts a new album rating into the database.
 * 
 * @param {string} Rating_title The title of the rating.
 * @param {Date|string} Rating_date The date of the rating.
 * @param {number} user_id The ID of the user who is making the rating.
 * @param {number} album_id The ID of the album being rated.
 * @param {string} Rating_body The body text of the rating.
 * @returns {Promise<Object>} The newly inserted rating object.
 */
const insertRatingforalbum = async (
  Rating_title,
  Rating_date,
  user_id,
  album_id,
  Rating_body
) => {
  try {
    const albumexists = await checkIfIdExists("albums", "album_id", album_id);
    if (!albumexists) {
      throw new Error(`Album with ID ${album_id} does not exist.`);
    }

    const userexists = await checkIfIdExists("users", "user_id", user_id);
    if (!userexists) {
      throw new Error(`User with ID ${user_id} does not exist.`);
    }
    let sql = `INSERT INTO ratingforalbum (
  Rating_title,
  Rating_date,
  user_id,
  album_id,
  Rating_body) values (?,?,?,?,?)`;
    const ratingalbum = await query(sql, [
      Rating_title,
      moment(Rating_date).format("YYYY-MM-DD"),
      user_id,
      album_id,
      Rating_body,
    ]);
    let insertedRatingalbum = await query(
      `SELECT * FROM ratingforalbum WHERE rating_id = ?`,
      [ratingalbum?.insertId]
    );
    return insertedRatingalbum;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing album rating in the database.
 * 
 * @param {number} rating_id The ID of the rating to update.
 * @param {string} Rating_title The new title of the rating.
 * @param {Date|string} Rating_date The new date of the rating.
 * @param {number} user_id The ID of the user updating the rating.
 * @param {number} album_id The ID of the album being rated.
 * @param {string} Rating_body The new body text of the rating.
 * @returns {Promise<Object>} The result of the update operation.
 */
const updateRatingforalbum = async (
  rating_id,
  Rating_title,
  Rating_date,
  user_id,
  album_id,
  Rating_body
) => {
  const albumexists = await checkIfIdExists("albums", "album_id", album_id);
  if (!albumexists) {
    throw new Error(`Album with ID ${album_id} does not exist.`);
  }

  const userexists = await checkIfIdExists("users", "user_id", user_id);
  if (!userexists) {
    throw new Error(`User with ID ${user_id} does not exist.`);
  }
  try {
    let sql = `Update ratingforalbum set 
  Rating_title = ?,
  Rating_date = ?,
  user_id = ?,
  album_id = ?,
  Rating_body = ? where rating_id = ?`;
    const ratingalbum = await query(sql, [
      Rating_title,
      moment(Rating_date).format("YYYY-MM-DD"),
      user_id,
      album_id,
      Rating_body,
      rating_id,
    ]);

    return ratingalbum;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes an album rating from the database.
 * 
 * @param {number} rating_id The ID of the rating to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 */
const deleteRatingforalbum = async (rating_id) => {
  try {
    return await query(`delete from ratingforalbum where rating_id = ?`, [
      rating_id,
    ]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getRatingforalbum,
  getRatingforalbumId,
  insertRatingforalbum,
  updateRatingforalbum,
  deleteRatingforalbum,
};
