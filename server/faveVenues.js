module.exports = {
  read: function(req, res, next) {
    db.favoriteVenues().then(faves => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(faves)
      }
    })
  },
  create: function(req, res, next) {
    db.addToFaveVenues().then(added => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(added)
      }
    })
  },
  delete: function(req, res, next) {
    db.removeByVenueId().then(deleted =>{
      if (err){
        res.status(500).json(err)
      } else {
        res.status(200).json(deleted)
      }
    })
  }
}
