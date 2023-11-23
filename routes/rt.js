const express = require("express");
const router = express.Router();

const c = require("../controllers/Controller");
// router.route("/apenda-permintaanDataDownloadFile/:id").get(c_gambar.downloadFile);
// router.route("/inputG/").post(c_gambar.inputGambar);
router.route("/getcsv").get(c.getcsv);
router.route("/getData").get(c.ambilData);
router.route("/trainData").get(c.trainData); 
router.route("/testmodel").post(c.testModel); 

router.get('/', function(req, res, next) {
    res.render("index");
});

module.exports = router;