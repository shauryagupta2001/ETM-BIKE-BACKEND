const Route=require('express')
const upload = require('../middleware/multer')
const { mget, mpost, uploadImag, combinedPost } = require('../controller/maintainenceController')

const Router=Route()

Router.route("/Mainget").get(mget)
Router.route("/Mainpost").post(
    upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    { name: 'frontImage', maxCount: 1 },
]),combinedPost)

module.exports=Router
