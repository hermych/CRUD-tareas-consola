require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if( tareasDB ){ //Cargar tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{

        opt = await inquirerMenu();
        
        switch( opt ){
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea( desc );
            break;

            case '2': //Listar tareas todas
                tareas.listadoCompleto()    ;
            break;

            case '3': //Listar completadas
                tareas.listarPedientesCompletadas(true);
            break;

            case '4': //Listar pedientes
                tareas.listarPedientesCompletadas(false);
            break;
            case '5': //Completado || pedientes
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6': //Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== 0){
                    const ok = await confirmar('¿Estas seguro?');
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada'.green); 
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();

    }while( opt !== '0' );
    // pausa();
}

main();