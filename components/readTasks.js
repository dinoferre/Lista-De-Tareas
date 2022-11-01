import { createTask } from './addTask.js';
import { uniqueDates , orderDates } from '../services/date.js';
import dateElement from './dateElement.js';

//defino la funcion
export const displayTasks = () => {
  //genero la lista de las tareas que ya estan almacenadas
  const list = document.querySelector('[data-list]');
      //texto que puso el usuario, fecha, moment(libreria que importo donde le indicamos la fecha que quiero ver como parametro)
  const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];
  //agrego una constante de fecha y le paso como parametro la lista que tengo almacenada
  const dates = uniqueDates(tasksList);
  //recorro el arreglo defecha
  //por cada una de nuestras fechas voy a recorrer un task
  orderDates(dates);
  dates.forEach((date) => {
    //genero el objeto moment tanto para la fecha como para la lista de tareas
    const dateMoment = moment(date, 'DD/MM/YYYY');
    list.appendChild(dateElement(date));
     //recorrer este arreglo (forEach) y obtengo cada uno de los elementos del mismo y nos regresa la estructura HTML ya definida
    tasksList.forEach((task) => {
      const taskDate = moment(task.dateFormat, 'DD/MM/YYYY');
      const diff = dateMoment.diff(taskDate);
      if (diff === 0) {
        list.appendChild(createTask(task));
      }
    });
  });
};
