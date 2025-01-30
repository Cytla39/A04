import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card.jsx'
import Visor from './Visor.jsx'
import { use } from 'react'

function App() {

  const [listaPokemones, setListaPokemones] = useState([]);

  const pokemonSeleccionado = JSON.parse(localStorage.getItem("pokemonSeleccionado"));

  const [detallePokemonSeleccionado, setPokemonSeleccionado] = useState(() => {
    return pokemonSeleccionado !== null ? pokemonSeleccionado.detalle : '';
  });

  const [imgUrl, setImgUrl] = useState(()=> {

    return pokemonSeleccionado !== null ? pokemonSeleccionado.imagen : '';

  });

  const [nombre, setNombre] = useState(() => {

    return pokemonSeleccionado !== null ? pokemonSeleccionado.nombre : '';
    
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
      const data = await res.json();
      setListaPokemones([...data.results]);
    }

    obtenerDatos();

  }, []);
  

  if (listaPokemones.length === 0) {
      return <>
      <h1>Cargando pokemones</h1>
      </>
  }

  const handleClick = async (url, imgUrl, nombre) => {
    const res = await fetch(url);
    const data = await res.json();

    setPokemonSeleccionado(data.effect_entries[0].effect);
    setImgUrl(imgUrl);
    setNombre(nombre);

    const pokemonSeleccionado = {
      nombre: nombre,
      imagen: imgUrl,
      detalle: data.effect_entries[0].effect
    };

    localStorage.setItem("pokemonSeleccionado", JSON.stringify(pokemonSeleccionado))

    // localStorage.setItem('pokemonSeleccionadoNombre', nombre);
    // localStorage.setItem('imgPokemonSeleccionado', imgUrl);
    // localStorage.setItem('pokemonSeleccionadoDetalle', data.effect_entries[0].effect);
  }


  return (
    
    <>
      <Visor imgUrl={imgUrl} detalle={detallePokemonSeleccionado} nombre={nombre} />

      <div className='row row-cols-1 row-cols-md-5 g-4'>
    {
        listaPokemones.map((p, i) => {
            return <Card key={i} url={p.url} handleClick={handleClick.bind(this)}></Card>
        })
    }
    </div>
    </>
  )
}

export default App
