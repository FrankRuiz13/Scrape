var router = require("express").Router();
var headlineController = require("../../controllers/headline");

router.get("/", headlineController.findAll)

module.exports = router;