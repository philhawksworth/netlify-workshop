var highlighter;
var timeoutID;
var nextDelay;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function spin(teaseDuration){
  var entries = document.querySelectorAll(".entry");
  Array.prototype.map.call(entries, function(entry) {
    entry.classList.remove("selected");
  });
  var next = getRandomInt(entries.length);
  entries[next].classList.add("selected")

  console.log("teaseDuration ", teaseDuration)

  if(teaseDuration > 400) {
    document.querySelector(".selected").classList.add("winner");
    window.clearTimeout(timeoutID);
    return freeze();
  } else {
    nextDelay = parseInt(teaseDuration * 1.05, 10);
  }

  timeoutID = window.setTimeout(function(){
    window.clearTimeout(timeoutID);
    highlighter = requestAnimationFrame(function(){
      spin(nextDelay);
    });
  }, teaseDuration);

}


function freeze() {
  cancelAnimationFrame(highlighter);
}


var btn = document.querySelector('#btn-spin');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  highlighter = requestAnimationFrame(function(){
    spin(30)
  });
}, false);


// format our argument based on the path
var formName = document.location.pathname.split("/draw")[0];
var formName = formName.replace(/-/g, "_");
var formName = formName.replace(/\//g,"");
var formName = "raffle_" + formName;

// fetch('/js/dummy-entries.js')
fetch('/.netlify/functions/entry-feed?form_name='+formName)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    var html = "";
    for(var person in data.handles) {
      html += '<li class="entry"><a href="https://twitter.com/'+ data.handles[person] +'"><img src=" https://twivatar.glitch.me/'+ data.handles[person] +'"></a>' +
      '<a class="name" href="https://twitter.com/'+ data.handles[person] +'">'+ data.handles[person] +'</a></li>';
    }
    document.querySelector("#list").innerHTML = html;
    return;
  });
