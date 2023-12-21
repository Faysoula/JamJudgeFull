const { validationResult } = require("express-validator");

const {
  getratingforsong,
  getratingforsongid,
  insertedRatingsongs,
  updateratingsong,
  deleteratingsong,
} = require("../services/ratingforsong-service");

const getratingforsongcontroller = async (req, res) => {
  try {
    const ratingsong = await getratingforsong();
    res.status(200).json({ ratingsong });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getratingforsongidcontroller = async (req, res) => {
  try {
    const rating_id = req.params.id;
    const ratingsong = await getratingforsongid(rating_id);
    res.status(200).json({ ratingsong });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertratingforsongcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Rating_title, Rating_date, user_id, songs_id, Rating_body } =
    req.body;

  try {
    const response = await insertedRatingsongs(
      Rating_title,
      Rating_date,
      user_id,
      songs_id,
      Rating_body
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateratingsongcontroller = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

   const {
     rating_id,
     Rating_title,
     Rating_date,
     user_id,
     songs_id,
     Rating_body,
   } = req.body;

  try {
    const response = await updateratingsong(
      rating_id,
      Rating_title,
      Rating_date,
      user_id,
      songs_id,
      Rating_body
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteratingforsongcontroller = async (req, res) => {
 const rating_id = req.params.id;

  if (!rating_id) {
    return res.status(400).json({ message: "missing rating id" });
  }

  try {
    const deletion = await deleteratingsong(rating_id);
    if (deletion.affectedRows === 0) {
      return res.status(400).json({ message: "song id not found" });
    }
    res.status(200).json({ deletion });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getratingforsongcontroller,
  getratingforsongidcontroller,
  insertratingforsongcontroller,
  updateratingsongcontroller,
  deleteratingforsongcontroller,
};
