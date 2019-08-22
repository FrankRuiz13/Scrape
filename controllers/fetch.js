var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res){
        return scrape().then(function(articles){
            console.log("articles: " + articles)
            return db.Headline.create(articles);
        }).then(function(dbArticles){
            if(dbArticles.length == 0){
                res.json({
                    message: "NO new article is scraped"
                })
            }
            else{
                res.json({
                    message: "Added " +dbArticles.length +"new Articles"
                })
            }
        })
        .catch(function(err){
            res.json({
                message: "Not saved to DB"
            })
        })
    }
}