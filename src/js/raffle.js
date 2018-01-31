
// $.getJSON( "https://raffle.netlify.com/.netlify/functions/entry-feed?callback=?showEntrants");

// (function() {

//   console.log("get it");
//   var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//   // var flickerAPI = "https://raffle.netlify.com/.netlify/functions/entry-feed?callback=?showEntrants=?";
//   $.getJSON(flickerAPI)
//   .done(function( json ) {
//     console.log( "JSON Data: " + json );
//   })
//   .fail(function( jqxhr, textStatus, error ) {
//     var err = textStatus + ", " + error;
//     console.log( "Request Failed: " + err );
//   })

//   // .done(function( data ) {
//   //     // $.each( data.items, function( i, item ) {
//   //     //   $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
//   //     //   if ( i === 3 ) {
//   //     //     return false;
//   //     //   }
//   //     // });
//   //   });
// })();


(function() {
  // var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  var flickerAPI = "http://localhost:9000/entry-feed?jsoncallback=?";
  // var flickerAPI = "https://raffle.netlify.com/.netlify/functions/entry-feed?jsoncallback=?";
  $.getJSON( flickerAPI, {
    format: "json"
  })
    .done(function( json ) {

      console.log(data)

      // $.each( data.items, function( i, item ) {
      //   console.log(item);
      //   if ( i === 3 ) {
      //     return false;
      //   }
      // });
    });
})();
