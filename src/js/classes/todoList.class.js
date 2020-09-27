import { Todo } from ".";


export class TodoList{

    constructor(){

        this.cargarLocalStorage();
        
    }


    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarEnLocalStorage();
    }

    eliminarTodo(id){
        //Devuelve un arreglo con todos los todos que no tienen ese id
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarEnLocalStorage();
    }

    cambiarEstadoTodo(id){


        for(const todo of this.todos){

            if(todo.id == id){
                todo.completado = !todo.completado;
                break;
            }
        }
        

        this.guardarEnLocalStorage();

    }

    eliminarCompletados( ){      
        
        //Devuelve un arreglo con todos los todo que no estan completados
        this.todos = this.todos.filter(todo => todo.completado != true);
        this.guardarEnLocalStorage();
        
    }

    guardarEnLocalStorage(){

        // localStorage.removeItem('keyTodos');
        // La clase debo pasarla a JSON para que despues pueda recuperar desde un string los valores
        localStorage.setItem('keyTodos', JSON.stringify(this.todos));

    }

    cargarLocalStorage(){

        this.todos = localStorage.getItem('keyTodos') ? JSON.parse(localStorage.getItem('keyTodos')) : [];

        //Transforma cada json a la obj Todo
        this.todos = this.todos.map(obj => Todo.fromJson(obj));
           
    }



}