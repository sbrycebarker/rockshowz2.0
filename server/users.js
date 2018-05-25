module.exports = {

  index: function(req, res, next){
    var db = req.app.get('db');
    db.getallusers().then(users => {
        res.status(200).json(users)
    })
  }
// nextval('users_id_seq'::regclass)
}
