require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer")
const Busquedas = require('./models/busquedas')

// console.log(process.env.MAPBOX_KEY)

const main = async () =>{
    const busquedas = new Busquedas()
    let opt 

    do {
        
        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
               // mostrar mensaje
               const termino = await leerInput('Ciudad: ')
               //buscar lugares
               const lugares = await busquedas.ciudad(termino);
               
               //seleccionar el lugar
               const id = await listarLugares(lugares)
               const lugarSel = lugares.find( l => l.id === id )

               //clima

               const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)
             

               //mostrar resultados
               console.clear()
               console.log('\nInformacion de la ciudad\n'.green);
               console.log('Ciudad:', lugarSel.nombre.green)
               console.log('Lat:', lugarSel.lat)
               console.log('Lng:', lugarSel.lng)
               console.log('Temperatura:', clima.temp)
               console.log('Minima:', clima.max)
               console.log('Maxima:', clima.max)
               console.log('Como esta el clima:', clima.desc.green)
          
            break;
        }

        if (opt != 0 ) await pausa()
    
        await pausa()

    } while (opt != 0);

}

main()