if (Meteor.isClient) {
  Tracker.autorun(function(handle){
    if(Session.get('loc')){
      HTTP.call('GET','http://api.worldweatheronline.com/free/v2/marine.ashx', 
        {params: {q: Session.get('loc'),format: 'json',key: '80871687910145e5eede51eaa2885'},},
        function(error, result){
          if(error){
            alert('Doh! Error getting current weather! See console!');
            console.log(error);
          } else {
            var d = new Date();
            var n = d.getHours() * 100; //1300
            var weather = _.find(result.data.data.weather[0].hourly, function(item){ 
              if(n < item.time){ // 0, 300, 600, 900, 1200, 1500, 1800, 2100
                return item;
              }
            });
            Session.set('weather', weather);
            Session.set('nearest_area', result.data.data.nearest_area[0]);
            Session.set('lat', result.data.data.nearest_area[0].latitude);
            Session.set('lon', result.data.data.nearest_area[0].longitude);
          }
        }
      );
    }
  });
  Template.body.events({
    'submit': function(event, template){
      event.preventDefault();
      if($('.navbar-toggle').css('display') !='none'){
        $(".navbar-toggle").trigger( "click" );
      }
      var qloc = template.find('#changeLocation').value;
      HTTP.call('GET','http://api.worldweatheronline.com/free/v2/search.ashx', 
        {params: {q: qloc,format: 'json',key: '80871687910145e5eede51eaa2885'},
        },
        function(error, result){
          if(error){
            alert('Doh! Error getting current coordinates for location! See console!');
            console.log(error);
          } else {
            if(result.data){
              if(result.data.search_api){
                if(result.data.search_api.result.length > 0){
                  Session.set('loc', parseInt(result.data.search_api.result[0].latitude) + ',' + parseInt(result.data.search_api.result[0].longitude));
                }
              }
            }
          }
        }
      );
    },
  });
  Template.body.helpers({
    nearestPoint: function(){
      if(Session.get('nearest_area'))
      return Session.get('nearest_area').latitude + ', ' + Session.get('nearest_area').longitude;
    },
    pointDistance: function(){
      if(Session.get('nearest_area'))
      return Session.get('nearest_area').distance_miles;
    },
    getWeatherSessionValue: function(value){
      if(Session.get('weather'))
      return Session.get('weather')[value];
    },
    getWeatherIcon: function(){
      if(Session.get('weather'))
      return Session.get('weather').weatherIconUrl[0].value;
    },
    loc: function () {
      if(Geolocation.latLng()){
        Session.set('loc', parseInt(Geolocation.latLng().lat) + ',' + parseInt(Geolocation.latLng().lng));
        Session.set('lat', Geolocation.latLng().lat);
        Session.set('lon', Geolocation.latLng().lng);
      }
    },
    error: Geolocation.error,
    lat: function(){
      if(Session.get('lat'))
      return Session.get('lat');
    },
    lon: function(){
      if(Session.get('lon'))
      return Session.get('lon');
    },
    getMapSize: function(){
      if(Session.get('device-screensize') == 'small'){
        if(Session.get('device-orientation') == 'landscape'){
          return 'size=600x320';
        } else {
          return 'size=320x600';
        }
      } else {
        if(Session.get('device-screensize') == 'large'){
          return "size=640x640&scale=2";
        } else {
          return "size=640x640&scale=2";
        }
      }
    }
  });
}

test = function(){
  //console.log ( Session.get('weatherHours') )
  var d = new Date();
  var n = d.getHours() * 100;
  var arr = Session.get('weatherHours');
  
  console.log(arr);
  var weather = _.find(arr, function(ar){ 
    console.log('n : ' + n); //1300
    console.log('ar.time: ' + ar.time); // 0, 300, 600, 900, 1200, 1500, 1800, 2100
    if(n < ar.time){
      return ar.time;
    }
  });
  console.log(weather);
};