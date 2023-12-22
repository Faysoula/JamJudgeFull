const { validationResult } = require("express-validator");

const {
  getAlbums,
  getAlbumsbyId,
  insertAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumByName,
  getAlbumDetailsAndReviews,
} = require("../services/album-service");

const path = require("path");

const getAlbumPageController = async (req, res) => {
  try {
    const album_id = req.params.id; // Get the album ID from the route parameter
    const albumData = await getAlbumDetailsAndReviews(album_id);
    res.render("albumrating", {
      albumDetails: albumData.details,
      reviews: albumData.reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAlbumsController = async (req, res) => {
  try {
    const albums = await getAlbums();
    res.status(200).json({ albums });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getAlbumsbyIdcontroller = async (req, res) => {
  try {
    const album_id = req.params.id;
    const albums = await getAlbumsbyId(album_id);
    res.status(200).json({ albums });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getalbumbynamecont = async (req, res, next) => {
  try {
    // Use req.query to get the album name from the search form
    const albumName = req.query.album_name;
    const albums = await getAlbumByName(albumName);
    res.locals.albums = albums; // Attach the albums to the response object
    res.render("search.ejs", { albums: res.locals.albums }); // Render here
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};


const insertAlbumcontroller = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);

  // Check for validation errors for text fields.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { album_name, album_date } = req.body;

  // Check for the file upload separately.
  if (!req.files || !req.files.album_cover) {
    return res.status(400).json({
      errors: [
        {
          msg: "please insert the cover of your record",
          param: "album_cover",
          location: "body",
        },
      ],
    });
  }

  const album_cover = req.files.album_cover;
  const uploadPath = path.resolve(
    path.join("static", "images", album_cover.name)
  );

  try {
    // Save the uploaded file to the uploads directory
    album_cover.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Insert the album details along with the file path to the database
      const response = await insertAlbum(
        album_name,
        `/images/${album_cover.name}`,
        album_date
      );
      console.log(uploadPath);
      res.status(201).json({
        message: "Album uploaded successfully",
        albumId: response.album_id, // Assuming response contains album_id
        albumCoverUrl: `/images/${album_cover.name}`,
      });
      
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAlbumcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { album_id, album_name, album_cover, album_date } = req.body;

  if (!album_id) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateAlbum(
      album_id,
      album_name,
      album_cover,
      album_date
    );
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteAlbumController = async (req, res) => {
  const album_id = req.params.id;

  if (!album_id) {
    return res.status(400).json({ message: "wheres the user id?" });
  }

  try {
    const result = await deleteAlbum(album_id);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "song id not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getAlbumsController,
  getAlbumsbyIdcontroller,
  insertAlbumcontroller,
  updateAlbumcontroller,
  deleteAlbumController,
  getalbumbynamecont,
  getAlbumPageController,
};
