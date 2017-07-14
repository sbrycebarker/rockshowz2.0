angular.module('myApp').service('spotifyServ', function($http){

    this.getAuth = function() {
        return $http({
            method: "GET",
            url: "https://accounts.spotify.com/authorize"
        }).then(function(response){
                return response.data
        })
    }

     this.getMusic = function(){
        return $http({
            method: 'GET',
            url: "https://api.spotify.com/api/v1/artists/{id}"
        }).then(function(response){
                return response.data;
        })
    };
});