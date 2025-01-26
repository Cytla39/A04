import { useState, useEffect } from "react";

function Card({ url, handleClick }) {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setPokemon(data);
    };

    obtenerDatos();
  }, []);

  if (pokemon === undefined) {
    return (
      <>
        <h1>Cargando pokemones</h1>
      </>
    );
  }


  return (
    <>
    <div className="card text-center" style={{ maxWidth: 450 }} onClick={(e) => handleClick(pokemon.abilities[0].ability.url, pokemon.sprites.other.dream_world.front_default, pokemon.name)}>

    <img
          src={pokemon.sprites.other.dream_world.front_default}
          className="card-img-top"
          alt="..."
        />

          <div className="card-body">
            <h5 className="card-title"> {pokemon.name}</h5>
          </div>
      </div>
    </>
  );
}

export default Card;
