var axios = require('axios');

/**
 * Api Variables
 */
var WpUrl = process.env.REACT_APP_WP_API_URL;
var WpApiDir = process.env.REACT_APP_WP_API_PREFIX;
;
var CurzaRoute = '/curza/v1';
var LnkSitesEndpoint = '/sites';

module.exports = {
  /**
   * Lista de Posts
   */
  /**
   * Sitio unico
   */
    getSite: function(options){
    var url = WpUrl +'/'+ WpApiDir + CurzaRoute + LnkSitesEndpoint + '/' + options.name;
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url)
        .then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
        });
    },
}