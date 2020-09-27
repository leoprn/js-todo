
import { TodoList } from './js/classes';
import { crearTodoHtml } from './js/componentes';
import './styles.css';

//Para poder exportarlo
export const todoList = new TodoList();

//Creo los todos html iniciales 
todoList.todos.forEach(crearTodoHtml);
//Es lo mismo que hacer
//todoList.todos.forEach( todo => crearTodoHtml( todo ));