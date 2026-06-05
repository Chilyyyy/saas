import React, { useState, useEffect } from 'react';
import './App.css'; // <-- Importamos el CSS externo

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    fetch('https://dattebayo-api.onrender.com/characters')
      .then(res => res.json())
      .then(data => {
        setCharacters(data.characters);
        setLoading(false);
      })
      
    
    const guardarfavoritos = JSON.parse(localStorage.getItem('narutofavoritos')) || [];
    setFavorites(guardarfavoritos);
  }, []);

  useEffect(() => {
    localStorage.setItem('narutofavoritos', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (char) => {
    if (favorites.find(f => f.id === char.id)) {
      setFavorites(favorites.filter(f => f.id !== char.id));
    } else {
      setFavorites([...favorites, char]);
    }
  };


  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="container">
      <h1 className="titulo">Naruto</h1>

      
      <div className="Buscador">
        <input
          type="text"
          placeholder="Busca"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

     
      { (
        <section>
          <h2>Favoritos</h2>
          <div className="character-grid">
            {favorites.map(char => (
              <CharacterCard key={char.id} char={char} isFav={true} onToggle={toggleFavorite} />
            ))}
          </div>
          <hr />
        </section>
      )}

      
      <section>
        <h2>Personajes</h2>
        <div className="character-grid">
          {filteredCharacters.map(char => (
            <CharacterCard 
              key={char.id} 
              char={char} 
              isFav={favorites.some(f => f.id === char.id)} 
              onToggle={toggleFavorite} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};


const CharacterCard = ({ char, isFav, onToggle }) => {
  return (
    <div className="imagenes">
      <img 
        src={char.images[0] || 'https://via.placeholder.com/150'} 
        alt={char.name} 
        className="imagenes-pj" 
      />
      <h3>{char.name}</h3>
      <button 
        onClick={() => onToggle(char)}
        className={`boton-fav ${isFav ? 'remove' : 'add'}`}
      >
        {isFav ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
      </button>
    </div>
  );
};

export default App;