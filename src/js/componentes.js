import { Todo } from "./classes";
import { todoList } from '../index'


//Referencias de HTML
const divTodolist  = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const classesFiltros = document.querySelectorAll('.filtro');
const todoPendientes = document.querySelector('.todo-count');

let contTodoPendientes = 0;

export const crearTodoHtml = ( todo ) =>{

    const htmlTodo  =   
    `<li class='${todo.completado?'completed': ''}' data-id='${todo.id}'>
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked': ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
        </div>
            <input class="edit" value="Rule the web">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //Insertar el li dentro del div que creamos
    divTodolist.append(div.firstElementChild);

     if(!todo.completado)   contTodoPendientes++;     
     todoPendientes.innerHTML = `<strong>${contTodoPendientes}</strong> pendiente(s)`;

return div.firstElementChild;

}


//Eventos
inputNewTodo.addEventListener('keyup', (event)=>{

    //Si se presiona el enter 
    if(event.keyCode === 13 && inputNewTodo.value.length > 0){

        const newTodo = new Todo(inputNewTodo.value);        

        todoList.nuevoTodo(newTodo);
        crearTodoHtml(newTodo);

        //Limpio el imput
        inputNewTodo.value='';
    
    }
    
});


divTodolist.addEventListener('click', (e)=>{

    const nombreElemento = e.target.localName;
    const elementoPadre = e.target.parentElement.parentElement;
    const id = elementoPadre.getAttribute('data-id');

    if (nombreElemento == 'input' || nombreElemento == 'label') {

        todoList.cambiarEstadoTodo(id);      
        
        //Agrega una clase si no existe, y se existe la quita
        elementoPadre.classList.toggle('completed')

        if(elementoPadre.classList.contains('completed')){
            contTodoPendientes--;
        }else{
            contTodoPendientes++;
        }
    
    }else{

        //Elimina el todo de la lista todo
        todoList.eliminarTodo( id );
        
        //Elimina el elemento del html
        divTodolist.removeChild(elementoPadre);
        
        if (!elementoPadre.classList.contains('completed')) {
                contTodoPendientes--;
        }
        
        
    }


    
    todoPendientes.innerHTML = `<strong>${contTodoPendientes}</strong> pendiente(s)`;

});

btnBorrarCompletados.addEventListener('click', ()=> {

    todoList.eliminarCompletados();

    // Código para actualizar el html ----------------------

    // REcorro todo el div donde tengo los todo y quito aquellos que tienen la clase completed
    // Recorro de abajo hacia arriba
    for(let i = divTodolist.children.length-1; i>=0 ; i--){

        
        const elemento = divTodolist.children[i];
        
        //Pregunto si el elemento en su lista de clases posee la palabra completed
        if(elemento.classList.contains('completed')){
            divTodolist.removeChild(elemento);
        }        
    }
    //------------------------------------------------------

});



filtros.addEventListener('click', (event) => {

    const etiqueta = event.target.text;

    if(!etiqueta){return;} //Por si se hace click en otro lado


    for(const elemento of divTodolist.children ){

        //Utilizaremos la clase hidden para ocultar o visualizar los elementos
        //Se debe sacar siempre el hidden para empezar
        elemento.classList.remove('hidden');

        //Elimino la clase selected de todos los filtros
        classesFiltros.forEach(filtro => filtro.classList.remove('selected'));



        const elementoCompletado = elemento.classList.contains('completed');
        
        switch(etiqueta){
            case 'Pendientes':
                
                event.target.classList.toggle('selected');
                
                if(elementoCompletado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':

                event.target.classList.toggle('selected');
                
                if (!elementoCompletado) {
                    elemento.classList.add('hidden');
                    
                }
                break;
            case 'Todos':
                event.target.classList.toggle('selected');
                break;
        }

    }


});