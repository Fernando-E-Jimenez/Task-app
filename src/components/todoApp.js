import {useState} from 'react';
import Todo from './todo';
import './todoApp.css';

export default function TodoApp() {

    //Como estamos utilizando funciones vamos a utilizar hooks para poder manipular el estado de react.
    //Since we are using functions we are going to use hooks to manipulate the state of react.

    //Estado que devuelve un arreglo de dos elementos
    const [title, setTitle] = useState("Hola");
    const [todos, setTodos] = useState([]);

    // function handleClick(e){
    //     e.preventDefault();
    //     setTitle("Ferve");
    // }

    function handleChange(event){
        const value = event.target.value;
        setTitle(value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const newTodo = {
            id: crypto.randomUUID(), //Es una API que te ayuda a generar IDs.
            title: title,
            completed: false
        }

        const temp = [...todos];
        temp.unshift(newTodo);

        //setTodos([...todos, newTodo]); forma rapida y poco legible
        setTodos(temp);

        setTitle('');
    }

    function handleUpdate(id, value){
        const temp = [...todos];
        const item = temp.find(item => item.id ===id);
        item.title = value;
        setTodos(temp);
    }

    function handleDelete(id){
        const temp = todos.filter(item => item.id != id);

        setTodos(temp);
    }

    return <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title}/>
            <input onClick={handleSubmit} type="submit" value="Create todo" className="buttonCreate"/>
        </form>

        <div className="todosContainer">
            {
                todos.map(item => (
                    <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                )) //Map hace un recorrido de todos los elementos y retorna una operacion
            }
        </div>
    </div>;
}