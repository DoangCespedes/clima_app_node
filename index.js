const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer")

let opt 

const main = async () =>{
    do {
        
        opt = await inquirerMenu()
        console.log(opt)
    
        await pausa()

    } while (opt != 0);
}

return main()