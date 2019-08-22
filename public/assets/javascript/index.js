$(document).ready(function(){
  $(document).on("click", ".scrapenews", handlearticlescrape);
  function handlearticlescrape() {
    $.get("/api/fetch").then(function (data){
      initpage();
    })
  }
  function initpage() {
    $.get("/api/headlines?saved=false").then(function (data){
      if(data){
        renderArticles(data)
      };
      else {renderEmpty();
      }
    })
  }
 

})