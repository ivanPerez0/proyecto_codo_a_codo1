
/* logica para EL MENU VERTICAL */

const toggleButton = document.getElementById('button-menu')
const navWrapper = document.getElementById('nav')

toggleButton.addEventListener('click',() => {
  toggleButton.classList.toggle('close') 
  navWrapper.classList.toggle('show')
})

navWrapper.addEventListener('click',e => {
  if(e.target.id === 'nav'){
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
  }
})

/*-------------------LOGICA PARA EL CARRITO-----------------------------------------------------------------------*/
function showPopup() {
  var popup = document.getElementById('cart-popup');
  popup.style.display = 'block';
}

function hidePopup() {
  var popup = document.getElementById('cart-popup');
  popup.style.display = 'none';
}
/*-------------------------------------------------------------------------------------------------------*/
