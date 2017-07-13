angular.module('myApp').service('spotifyServ', function($http){

     this.getMusic = function(){
        return $http({
            method: 'GET',
            url: "https://api.spotify.com/api/v1/artists/{id}"
        }).then(function(response){
                return response.data;
        })
    };
});