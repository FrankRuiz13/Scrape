$(document).ready(function(){
  $(document).on("click", ".scrapenews", handlearticlescrape);
  var articleContainer = $(".article-container");
  
  function handlearticlescrape() {
    $.get("/api/fetch").then(function (data){
      initPage();
    })
  }
  function initPage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/api/headlines?saved=false").then(function(data) {
      articleContainer.empty();
      // If we have headlines, render them to the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // Otherwise render a message explaining we have no articles
        renderEmpty();
      }
    });
  }
  $.get("/api/headlines?saved=false").then(function (data){
    if(data){
      renderArticles(data)
    }
    else {
      renderEmpty();
    }
  })

function renderArticles(articles) {
  var articleCards = [];
  for(var i=0; i<articles.length; i++){
    articleCards.push(createCard(articles[i]));
  }
  articleContainer.append(articleCards);
}
function createCard(){
  var card = $("<div class='card'>");
  var cardHeader = $("<div class='card-header'>").append(
    $("<h3>").append(
      $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
        .attr("href", article.link)
        .text(article.title),
      $("<a class='btn btn-success save'>Save Article</a>")
    )
  );
  card.append(cardHeader);
  // We attach the article's id to the jQuery element
  // We will use this when trying to figure out which article the user wants to save
  card.data("_id", article._id);
  // We return the constructed card jQuery element
  return card;
}
function renderEmpty() {
  var emptyAlert = $(
    [
      "<div class='alert alert-warning text-center'>",
      "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
      "</div>",
      "<div class='card'>",
      "<div class='card-header text-center'>",
      "<h3>What Would You Like To Do?</h3>",
      "</div>",
      "<div class='card-body text-center'>",
      "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
      "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
      "</div>",
      "</div>"
    ].join("")
  );
  articleContainer.append(emptyAlert);
}
 

})