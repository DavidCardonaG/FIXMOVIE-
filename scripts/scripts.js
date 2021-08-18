const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('f-Iz');
const flechaDerecha = document.getElementById('f-Der');

flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});
const numeroInd = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroInd; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});



 import {data} from '../data/data.js';

const templePeli = document.getElementById('template-peli').content;
const fragment = document.createDocumentFragment();
const  items = document.getElementById('items');
const detail = document.getElementById('detail');
let pelicula = {};

document.addEventListener('DOMContentLoaded', () => {
    loadImage(data);
})


const loadImage = data => {

    data.forEach( pelicula =>{
        const {id,name,image} = pelicula;
        templePeli.querySelector('h5').textContent = name;
        templePeli.querySelector('img').setAttribute('src',image);
        templePeli.querySelector('img').dataset.id = id;
       const clone = templePeli.cloneNode(true);
       fragment.appendChild(clone);


})
 items.appendChild(fragment);
}
items.addEventListener('click', e => {
    
    let idTarget = e.target.dataset.id;
    
   
    data.forEach(pelicula => {
        
        const {id,name,descripcion,image,director,duracion} = pelicula;
       
        if(id == idTarget){
            const objeto = {
                id: id,
                name: name,
                descripcion:descripcion,
                image: image,
                director: director,
                duracion: duracion
            }
            localStorage.setItem("pelicula",JSON.stringify(objeto));
            getPelicula();
        }   
    })
    e.stopPropagation();
    e.preventDefault();
 })
 function getPelicula(){
    detail.innerHTML = '';
   pelicula = JSON.parse(localStorage.getItem("pelicula")); 
    const {name,descripcion,director,image,duracion} = pelicula;
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${name}</h2>
         <h4>${descripcion}</h4>
         <h5>${director}</h5>
         <h5>${duracion}</h5>
        </td>
    </tr>
</table>
 `
}