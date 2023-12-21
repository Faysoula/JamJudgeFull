const { query } = require("../database/Database");
const { checkIfIdExists } =require("../helper");
const moment = require("moment")

/**
 * Retrieves all songs from the database.
 * 
 * @returns {songs} An array of song objects.
 */
const getSongs = async () => {
  try {
    let sql = `select * from songs`;
    const songs = await query(sql);
    return songs;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific song by its ID.
 * 
 * @param {number} songs_id The ID of the song to retrieve.
 * @returns {songs} A song object if found.
 */
const getSongsId = async (songs_id) => {
  try {
    let sql = `select * from songs where songs_id = ?`;
    const songs = await query(sql, [songs_id]);
    return songs;
  } catch (error) {
    throw new Error(error);
  }
};

const searchSongsByAlbumName = async (albumName) => {
  try {
    const query = `
      SELECT * FROM songs 
      WHERE album_id IN (
        SELECT album_id FROM albums WHERE album_name LIKE ? 
      )
    `; //dr told me to do this
    const [results] = await connection.execute(query, [`%${albumName}%`]);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieves all songs belonging to a specific album.
 * 
 * @param {number} album_id The ID of the album.
 * @returns {songs} An array of song objects from the specified album.
 */
const getsongsforalbum = async (album_id) => {
  try {
    let sql = `SELECT * FROM songs WHERE album_id = ?`;
    const songs = await query(sql, [album_id]);
    return songs;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves all songs by a specific artist.
 * 
 * @param {number} artist_id The ID of the artist.
 * @returns {songs} An array of song objects from the specified artist.
 */
const getsongsforartist = async (artist_id) => {
  try {
    let sql = `SELECT * FROM songs WHERE artist_id = ?`;
    const songs = await query(sql, [artist_id]);
    return songs;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Inserts a new song into the database.
 * 
 * @param {string} songs_name The name of the song.
 * @param {string} songs_cover The cover image URL of the song.
 * @param {Date|string} songs_date The release date of the song.
 * @param {boolean} songs_explicit Indicates if the song is explicit.
 * @param {number} album_id The ID of the album the song belongs to.
 * @param {number} artist_id The ID of the artist of the song.
 * @returns {songs} The inserted song object.
 */
const insertsongs = async (
  songs_name,
  songs_cover,
  songs_date,
  songs_explicit,
  album_id,
  artist_id
) => {
  const albumExists = await checkIfIdExists("albums", "album_id", album_id);
  if (!albumExists) {
    throw new Error(`Album with ID ${album_id} does not exist.`);
  }

  // Check if the artist exists
  const artistExists = await checkIfIdExists("artist", "artist_id", artist_id);
  if (!artistExists) {
    throw new Error(`Artist with ID ${artist_id} does not exist.`);
  }
  try {
    let sql = `insert into songs (songs_name, songs_cover, songs_date, songs_explicit, album_id, artist_id) values (?,?,?,?,?,?)`;
    const songs = await query(sql, [
      songs_name,
      songs_cover,
      moment(songs_date).format("YYYY-MM-DD"),
      songs_explicit,
      album_id,
      artist_id,
    ]);
    let insertedsong = await query(`SELECT * FROM songs WHERE songs_id = ?`, [
      songs?.insertId,
    ]);
    return insertedsong;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 * Updates an existing song in the database.
 * 
 * @param {number} songs_id The ID of the song to update.
 * @param {string} songs_name New name of the song.
 * @param {string} songs_cover New cover image URL of the song.
 * @param {Date|string} songs_date New release date of the song.
 * @param {boolean} songs_explicit Updated explicit status of the song.
 * @param {number} album_id Updated album ID the song belongs to.
 * @param {number} artist_id Updated artist ID of the song.
 * @returns {songs} The result of the update operation.
 */
const updatesong = async(
  songs_id,
  songs_name,
  songs_cover,
  songs_date,
  songs_explicit,
  album_id,
  artist_id
) => {
  if (!albumExists) {
    throw new Error(`Album with ID ${album_id} does not exist.`);
  }

  // Check if the artist exists
  const artistExists = await checkIfIdExists("artist", "artist_id", artist_id);
  if (!artistExists) {
    throw new Error(`Artist with ID ${artist_id} does not exist.`);
  }
    try{
    let sql = `UPDATE songs set 
  songs_name = ?,
  songs_cover = ?,
  songs_date = ?,
  songs_explicit = ?,
  album_id = ?,
  artist_id = ? where songs_id = ?`;
  const songs = await query(sql, [
    songs_name,
    songs_cover,
    moment(songs_date).format("YYYY-MM-DD"),
    songs_explicit,
    album_id,
    artist_id,
    songs_id
  ]);
  console.log(songs);
  return songs;
}catch(error){
    throw new Error(error)
}
}

/**
 * Deletes a song from the database based on its ID.
 * 
 * @param {number} songs_id The ID of the song to delete.
 * @returns {Promise} The result of the delete operation.
 */

const deletesongs = async (songs_id) => {
  try {
    return await query("DELETE FROM songs WHERE songs_id = ?", [songs_id]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
    getSongs,
    getSongsId,
    getsongsforalbum,
    searchSongsByAlbumName,
    getsongsforartist,
    insertsongs,
    updatesong,
    deletesongs
}