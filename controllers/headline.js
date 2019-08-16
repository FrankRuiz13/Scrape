var db = require("../models");

module.exports = {
    findAll: function(req, res){
        db.Headline.find(req.query)
        .then(function(dbHeadline){
            res.json(dbHeadline);
        })
    }
}