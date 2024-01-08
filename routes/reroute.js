const Router=require('express')
const { Rpost, Rget } = require('../controller/recontroller')


const router=Router()

router.route("/Rpost").post(Rpost)
router.route("/Rget").get(Rget)

module.exports=router