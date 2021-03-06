var axios = require('axios');

/**
 * Api Variables
 */
var WpUrl = process.env.REACT_APP_WP_API_URL;
var WpApiDir = process.env.REACT_APP_WP_API_PREFIX;
var ProgramasUrl = process.env.REACT_APP_PROGRAMAS_URL;
var ProgramasPrefix = process.env.REACT_APP_PROGRAMAS_PREFIX;
var ProgramasRoute = process.env.REACT_APP_PROGRAMAS_ROUTE;

var CurzaRoute = '/curza/v1';
var LnkSitesEndpoint = '/sites';

// Subsitio Curza
export function getSite(options){
    var url = WpUrl +'/'+ WpApiDir + CurzaRoute + LnkSitesEndpoint + '/' + options.name;
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url).then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
    });
};

export function getQueryProgramas(options){
    var url = ProgramasUrl +'/'+ ProgramasPrefix +'/'+ ProgramasRoute+ '/' + options.name;
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url).then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
    });
};

// Carreras del Departamento
export function getCarrerasDpto(options){
    var url = ProgramasUrl +'/'+ ProgramasPrefix +'/'+ ProgramasRoute + '/carrera/departamento?id=' + options.departamento;
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url).then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
    });
}

// Carrera por ID
export function getCarreraPorId(options){
    var url = ProgramasUrl +'/'+ ProgramasPrefix +'/'+ ProgramasRoute + '/carrera/' + options.carrera;
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url).then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
    });
}

// AsignaturasDelPlan
export function getAsignaturasPlan(options){
    var url = ProgramasUrl +'/'+ ProgramasPrefix +'/'+ ProgramasRoute + '/asignatura/plan?id=' + options.plan + '&withExport=1';
    if(options.debug){
        console.log(options,url);
    }
    return axios.get(url).then(function(response){
        if(options.debug){
            console.log(response.data);
        }
        return response.data;
    });
}