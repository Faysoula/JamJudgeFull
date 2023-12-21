const { validationResult } = require("express-validator");

const {
  getArtist,
  getArtistId,
  insertArtist,
  updateArtist,
} = require("../services/artists-service");

const getArtistscontoller = async (req, res) => {
  try {
    const artists = await getArtist();
    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getArtistsIdcontroller = async (req, res) => {
  try {
    const artist_id = req.params.id;
    const artists = await getArtistId(artist_id);
    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertArtistcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { artist_alias, artist_genre, artist_about } = req.body;

  try {
    const response = await insertArtist(
      artist_alias,
      artist_genre,
      artist_about
    );

    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateartistcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { artist_id, artist_alias, artist_genre, artist_about } = req.body;

  if (!artist_id) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateArtist(
      artist_id,
      artist_alias,
      artist_genre,
      artist_about
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

module.exports = {
  getArtistscontoller,
  getArtistsIdcontroller,
  insertArtistcontroller,
  updateartistcontroller,
};
