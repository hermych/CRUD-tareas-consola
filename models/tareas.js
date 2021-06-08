const Tarea = require('./tarea');
/**
 * _listado:
 *     {    'uuid-1212165461-2421-2: { id:12, desc: asdasdqwe, completadoEn: 4445 } },
 */
class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = ''){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea( desc = '' ){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach( ( tarea, id ) => {
            const idx = `${id + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado =  ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPedientesCompletadas( completadas = true ){

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            
            const { desc, completadoEn } = tarea;
            const estado =  ( completadoEn )
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                // Mostrar completadas
                if( completadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${desc} :: ${completadoEn.green}`);
                }
            } else {
                // Mostrar pendientes
                if( !completadoEn ){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const  tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }

        })
    }

}

module.exports = Tareas;