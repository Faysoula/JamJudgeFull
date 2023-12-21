const { validationResult } = require("express-validator");
const {
  getSongs,
  getSongsId,
  getsongsforalbum,
  getsongsforartist,
  searchSongsByAlbumName,
  insertsongs,
  updatesong,
  deletesongs,
} = require("../services/songs-service");


const getSongsByAlbumName = async (req, res) => {
  const { albumName } = req.query;

  try {
    const songs = await searchSongsByAlbumName(albumName);
    res.json({ songs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getsongscontroller = async (req, res) => {
  try {
    const songs = await getSongs();
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getSongsIdcontroller = async (req, res) => {
  try {
    const songs_id = req.params.id;
    const songs = await getSongsId(songs_id);
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getsongsforalbumcontroller = async (req, res) => {
  try {
    const album_id = req.params.id;
    const songs = await getsongsforalbum(album_id);
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getsongsforartistcontroller = async (req, res) => {
  try {
    const artist_id = req.params.id;
    const songs = await getsongsforartist(artist_id);
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertsongsController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    songs_name,
    songs_cover,
    songs_date,
    songs_explicit,
    album_id,
    artist_id,
  } = req.body;

  try {
    const response = await insertsongs(
      songs_name,
      songs_cover,
      songs_date,
      songs_explicit,
      album_id,
      artist_id
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updatesongscontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    songs_id,
    songs_name,
    songs_cover,
    songs_date,
    songs_explicit,
    album_id,
    artist_id,
  } = req.body;

  try {
    const response = await updatesong(
      songs_id,
      songs_name,
      songs_cover,
      songs_date,
      songs_explicit,
      album_id,
      artist_id
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deletesongscontroller = async (req, res) => {

  const songs_id = req.params.id;

  if (!songs_id) {
    return res.status(400).json({ message: "missing song id" });
  }

  try {
    const deletion = await deletesongs(songs_id);
    if (deletion.affectedRows === 0) {
      return res.status(400).json({ message: "song id not found" });
    }
    res.status(200).json({ deletion });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getsongscontroller,
  getSongsIdcontroller,
  getsongsforalbumcontroller,
  getsongsforartistcontroller,
  insertsongsController,
  updatesongscontroller,
  deletesongscontroller,
  getSongsByAlbumName
};
