const axios = require('axios')

class Busquedas {
    historial = ['Caracas', 'Colorado', 'Paris']

    constructor() {
        //TODO leer DB si existe
    }

    // get paramsMapbox(){
    //     return{
    //         'q':`${lugar}`,    
    //         'language':'es',
    //         'access_token': 'pk.eyJ1IjoiZG1vaXNlc2MtbDA4OTMiLCJhIjoiY20xbzR2a2JzMHhiYTJybjY0ejVjbGNkNiJ9.FjRja1bwrZ1dheRYfSnqaA'
    //     }
    // }

    async ciudad( lugar = ''){
    
        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/search/geocode/v6/forward`,  
                params: {
                    'q':`${lugar}`,    
                    'language':'es',
                    'access_token': process.env.MAPBOX_KEY
                }
            })

            const resp = await instance.get()
            // const resp = await axios.get('https://api.mapbox.com/search/geocode/v6/forward?q=madrid&language=es&access_token=pk.eyJ1IjoiZG1vaXNlc2MtbDA4OTMiLCJhIjoiY20xbzR2a2JzMHhiYTJybjY0ejVjbGNkNiJ9.FjRja1bwrZ1dheRYfSnqaA')
            console.log(resp.data.features)

            return[]
            
        } catch (error) {
            
            return []; //retorna los lugares
        }
    
    }
}

module.exports = Busquedas