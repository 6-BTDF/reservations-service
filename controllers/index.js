const helpers = require('../db/models.js');

function getSpecificListing(req, res) {
  helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      // eslint-disable-next-line linebreak-style
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
}

// must modify
function addBooking(req, res) {
  helpers.listingModel.findOneAndUpdate({ id: req.params.id },
    { $push: { reserved: req.body } }, { new: true })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
}

function modifyBooking(req, res) {
  helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
}

function deleteBooking(req, res) {
  helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
}

module.exports = {
  getSpecificListing,
  addBooking,
  modifyBooking,
  deleteBooking,
};
