const express = require('express')
      reload = require('reload')

const app = express();







//<<==================================== server setup =====================================>>

app.use(express.static('./public'))

reload(app);

let port = 8081
app.listen(port, function() {
console.log("listening on port " + port)
})
