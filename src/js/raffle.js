var highlighter;


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function spin(entries){
  Array.prototype.map.call(entries, function(entry) {
    entry.classList.remove("selected");
  });
  var next = getRandomInt(entries.length);
  entries[next].classList.add("selected")
  highlighter = requestAnimationFrame(function(){
    spin(entries)
  });
}


function freeze() {
  cancelAnimationFrame(highlighter);
}


var btn = document.querySelector('#btn-spin');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  var entries = document.querySelectorAll(".entry");
  highlighter = requestAnimationFrame(function(){
    spin(entries)
  });
}, false);


var btn = document.querySelector('#btn-pick');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  freeze();
}, false);


// format our argument based on the path
var formName = document.location.pathname.split("/draw")[0];
var formName = formName.replace("-","_");
var formName = formName.replace("/","");
var formName = "raffle_" + formName;

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
