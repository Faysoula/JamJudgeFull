const { query } = require("../database/Database");

/**
 * Retrieves all artists from the database.
 * 
 * @returns {Promise<Array>} An array of artist records.
 */
const getArtist = async () => {
  try {
    let sql = `SELECT * FROM artist`;
    const artists = await query(sql);
    return artists;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific artist by their ID.
 * 
 * @param {number} artist_id The ID of the artist to retrieve.
 * @returns {Promise<Object>} The requested artist object.
 */
const getArtistId = async (artist_id) => {
  try {
    let sql = `SELECT * FROM artist where artist_id = ?`;
    const artists = await query(sql, [artist_id]);
    return artists;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Inserts a new artist into the database.
 * 
 * @param {number} artist_id The ID of the artist.
 * @param {string} artist_alias The alias or stage name of the artist.
 * @param {string} artist_genre The genre associated with the artist.
 * @param {string} artist_about A brief description or bio of the artist.
 * @returns {Promise<Object>} The newly inserted artist object.
 */
const insertArtist = async (
  artist_id,
  artist_alias,
  artist_genre,
  artist_about
) => {
  try {
    let sql = `INSERT INTO artist (artist_id, artist_alias, artist_genre, artist_about) values (?,?,?,?)`;
    await query(sql, [artist_id, artist_alias, artist_genre, artist_about]);
    let insertedArtist = await query(
      `SELECT * FROM artist WHERE artist_id = ?`,
      [artist_id]
    );
    return insertedArtist;
  } catch (error) {
    throw new Error(error);
  }
};


/**
 * Updates an existing artist in the database.
 * 
 * @param {number} artist_id The ID of the artist to update.
 * @param {string} artist_alias The new alias or stage name of the artist.
 * @param {string} artist_genre The new genre associated with the artist.
 * @param {string} artist_about The new description or bio of the artist.
 * @returns {Promise<Object>} The result of the update operation.
 */
const updateArtist = async (
  artist_id,
  artist_alias,
  artist_genre,
  artist_about
) => {
  try {
    let sql = `update artist set 
         artist_alias = ?,
         artist_genre = ?, 
         artist_about = ? where artist_id = ?`;
    const artist = await query(sql, [
      artist_alias,
      artist_genre,
      artist_about,
      artist_id
    ]);
    return artist;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes an artist from the database.
 * 
 * @param {number} artist_id The ID of the artist to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 */
const deleteartist = async (artist_id) => {
  try {
    return await query(`delete from artists where artist_id = ?`, [artist_id]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getArtist,
  getArtistId,
  insertArtist,
  updateArtist,
  deleteartist,
};
