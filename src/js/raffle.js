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


// fetch('/js/dummy-entries.js')
//   .then(function(response) { return response.json(); })
//   .then(function(data) {
//     var html = "";
//     for(var person in data.items) {
//       html += "<div class='entry'>"+ data.items[person].twitterHandle +"</div>";
//     }
//     document.querySelector("#list").innerHTML = html;
//     return;
//   });
