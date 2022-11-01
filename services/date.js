//exporto la funcion de fecha unica y recibe la lista de tareas
export const uniqueDates = (tasks) => {
  //defino la constante unique = arreglo vacio
  const unique = [];
  //recorro el arreglo con el metodo forEach
  tasks.forEach((task) => {
    //le indico con un if si nuestro arreglo tiene fechas iguales y que haga (push)
    if (!unique.includes(task.dateFormat)) unique.push(task.dateFormat);
  });

  return unique;
};

//ordeno las fechas (sort)
export const orderDates = (dates) => {
  return dates.sort( (a , b) => {
    const firstDate = moment(a, 'DD/MM/YYYY');
    const secondDate = moment(b, 'DD/MM/YYYY');
    return firstDate - secondDate;
  })
};
