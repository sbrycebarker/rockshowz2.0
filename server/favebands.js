module.exports = {
  read: function(req, res, next) {
    var db = req.app.get('db')
    db.getFavoritebands(req.user.user_id).then(faves => {
        res.status(200).json(faves)
    })
  },
  create: function(req, res, next) {
    var db = req.app.get('db')
    db.addToFaveBands( req.params.userId , req.params.band_id).then(added => {
        res.status(200).json(added)
    })
  },
  delete: function(req, res, next) {
    var db = req.app.get('db')
    db.removeFaveBandById(req.params.userId , req.params.band_id).then(deleted =>{
        res.status(200).json(deleted)
    })
  }
}
