const { query } = require("../database/Database");
const moment = require("moment");

/**
 * Retrieves all albums from the database.
 *
 * @returns {albums} A promise that resolves to an array of all albums.
 */
const getAlbums = async () => {
  try {
    let sql = `SELECT * FROM albums`;
    const albums = await query(sql);
    return albums;
  } catch (error) {
    throw new Error(error);
  }
};

const getAlbumByName = async (albumName) => {
  try {
    const sql = `SELECT * FROM albums WHERE album_name LIKE ?`;
    const albums = await query(sql, [`%${albumName}%`]);
    return albums;
  } catch (error) {
    throw new Error(error);
  }
};


/**
 * Retrieves a specific album from the database based on its ID.
 *
 * @param {number} album_id The unique identifier of the album.
 * @returns {albums} A promise that resolves to the album object.
 */
const getAlbumsbyId = async (album_id) => {
  try {
    let sql = `SELECT * FROM albums where album_id = ?`;
    const albums = await query(sql, [album_id]);
    return albums;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Inserts a new album into the database.
 *
 * @param {string} album_name The name of the album.
 * @param {string} album_cover_path The file path or URL of the album's cover image.
 * @param {Date} album_date The release date of the album.
 * @returns {insertedAlbum} A promise that resolves to the inserted album object.
 */
const insertAlbum = async (album_name, album_cover_path, album_date) => {
  try {
    let sql = `INSERT INTO albums (album_name, album_cover, album_date) VALUES (?, ?, ?)`;
    const result = await query(sql, [album_name, album_cover_path, album_date]);
    const insertedAlbum = await query(
      `SELECT * FROM albums WHERE album_id = ?`,
      [result.insertId]
    );
    return insertedAlbum;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing album in the database based on its ID.
 *
 * @param {number} album_id The unique identifier of the album to be updated.
 * @param {string} album_name The new name of the album.
 * @param {string} album_cover The new file path or URL to the album's cover image.
 * @param {Date|string} album_date The new release date of the album, formatted to "YYYY-MM-DD".
 * @returns {result} The result of the update operation.
 */
const updateAlbum = async (album_id, album_name, album_cover, album_date) => {
  try {
    let sql = `update albums set 
        album_name = ?, 
        album_cover = ?, 
        album_date = ?
        where album_id = ?
        `;
    const result = await query(sql, [
      album_name,
      album_cover,
      moment(album_date).format("YYYY-MM-DD"),
      album_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes an album from the database based on its ID.
 *
 * @param {number} album_id The unique identifier of the album to delete.
 * @returns {result} The result of the delete operation.
 */
const deleteAlbum = async (album_id) => {
  try {
    const result = await query(`delete from albums where album_id = ?`, [
      album_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAlbums,
  getAlbumByName,
  getAlbumsbyId,
  insertAlbum,
  updateAlbum,
  deleteAlbum,
};
