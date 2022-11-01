//defino la funcion para exportar que recibe como parametro la fecha
export default (date) => {
  //agrego el elemento li a la lista y le agrego la clase(date) y le indico el contenido HTML
  const dateElement = document.createElement('li');
  dateElement.classList.add('date');
  dateElement.innerHTML = date;
  //retorno la estructura que se genero
  return dateElement;
};
