module.exports = {
  read: function(req, res, next) {
    db.favoritebands().then(faves => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(faves)
      }
    })
  },
  create: function(req, res, next) {
    db.addToFaveBands().then(added => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(added)
      }
    })
  },
  delete: function(req, res, next) {
    db.removeByBandId().then(deleted =>{
      if (err){
        res.status(500).json(err)
      } else {
        res.status(200).json(deleted)
      }
    })
  }
}
