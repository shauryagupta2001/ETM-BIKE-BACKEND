const Route=require('express')
const { iget, ipost } = require('../controller/iotController')

const Router=Route()

Router.route("/iotget").get(iget)
Router.route("/iotpost").post(ipost)

module.exports=Router
