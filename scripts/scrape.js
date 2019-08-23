var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function(){
   return axios.get("https://news.ycombinator.com/").then(function(response) {
       // Then, we load that into cheerio and save it to $ for a shorthand selector
       var $ = cheerio.load(response.data);
       var articles = [];
       console.log("scrape function")
       // Now, we grab every h2 within an article tag, and do the following:
       // For each element with a "title" class
  $(".title > a").each(function(i, element) {
     var result = {}
     // Save the text and href of each link enclosed in the current element
     var title = $(element).text();
     var link = $(element).attr("href");
     // If this found element had both a title and a link
     if (title && link) {
       // Insert the data in the scrapedData db
       result.title = title;
       result.link = link;
       articles.push(result);
     }
 });
       return articles;
   })
}
module.exports = scrape;