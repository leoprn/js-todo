

export class Todo{


    //Medodo para transformar de un json que viene del localstorage a el objeto TODO
    static fromJson({id, tarea, completado, creado}){

        const tempTodo = new Todo ( tarea );
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }



    constructor(tarea){        
        this.id = new Date().getTime();
        this.tarea = tarea;
        this.completado = false;
        this.creado  = new Date();
    }

}