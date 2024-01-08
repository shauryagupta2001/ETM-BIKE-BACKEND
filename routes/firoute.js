const Route=require('express')
const { fget, fpost } = require('../controller/ficontroller')

const Router=Route()

Router.route("/fget").get(fget)
Router.route("/data").post(fpost)

module.exports=Router
