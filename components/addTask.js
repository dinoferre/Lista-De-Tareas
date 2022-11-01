import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

//Funcion addTask que trae el elemento que generea el formulario
export const addTask = (evento) => {
  evento.preventDefault();
  //traigo lo que genera el usuario = lista, nombre de tarea, calendario
  const list = document.querySelector('[data-list]');
  const input = document.querySelector('[data-form-input]');
  const calendar = document.querySelector('[data-form-date]');
  //texto que puso el usuario, fecha, moment(libreria que importo donde le indico la fecha que quiero ver como parametro)
  const value = input.value;
  const date = calendar.value;
  const dateFormat = moment(date).format('DD/MM/YYYY');

  if (value === '' || date === '') {
    //le indico que si alguno de los datos estan vacios, no siga ejecutando la funcion
    return;
  }

  //limpio el input y calendario para que tengan un string vacio
  input.value = '';
  calendar.value = '';

  const complete = false;

  //genero la constante(taskObj) donde se va a guardar value, dateFormat, complete, id
  const taskObj = {
    value,
    dateFormat,
    //agrego llave complete (al inicio siempre es false ya que al agregar una nueva tarea no esta completada)
    complete,
    //agrego a cada uno de los elementos un identificador (para saber cual esta completado o eliminarlo)
    id: uuid.v4()
  };

  list.innerHTML = '';

  //const taskList =  a lo que tenga almacenado el local storage con la llave "task"(pestaña aplication), lo regresa en formato JSON (JSON.parse) y en caso que regrese null, lo transforma en un arreglo vacio
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  //al tasklist le agrego el taskobj, que es la ultima tarea que el usuario registra
  taskList.push(taskObj);
  //luego lo almacena y lo convierte en formato JSON (JSON.stringify)
  localStorage.setItem('tasks', JSON.stringify(taskList));
  //llamo a la funcion displaytask
  displayTasks();
};

//desestructuro el objeto que recibe createTask obteniendo los valores de taskObj
export const createTask = ({ value, dateFormat, complete, id }) => {
  const task = document.createElement('li');
  task.classList.add('card');

  const taskContent = document.createElement('div');


  const check = checkComplete(id)

  //en caso que complete sea true, se agregan las clases CSS
  if (complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  const titleTask = document.createElement('span');
  titleTask.classList.add('task');
  titleTask.innerText = value;
  taskContent.appendChild(check);
  taskContent.appendChild(titleTask);

  const dateElement = document.createElement('span');
  dateElement.innerHTML = dateFormat;

  task.appendChild(taskContent);
  task.appendChild(dateElement);
  task.appendChild(deleteIcon(id));
  return task;
};
