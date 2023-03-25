import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [cat, setCat] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [weight, setWeight] = useState(null);
  const [banList, setBanList] = useState(null);

  const handleClick = async () => {
    const fetchData = async () => {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${API_KEY}`);
      const data = await response.json();
      const id = data[0].id;
      console.log(id);
      setCat(data);

      const response2 = await fetch(`https://api.thecatapi.com/v1/images/${id}?api_key=${API_KEY}`);
      const data2 = await response2.json();
      console.log(data2);
      setName(data2.breeds[0].name);
      setDescription(data2.breeds[0].description);
      setWeight(data2.breeds[0].weight.imperial);
    }
    fetchData().catch(console.error);
  };

  const handleBan = async () => {
  };
  
  return (
    <div className="whole-page">
      <h1>Discover cats!</h1>
      <button onClick={handleClick}>Find Cats!</button>
      <div className="cat-container">
        {cat && cat.map((cat) => (
          <div className="cat-card">
            <img src={cat.url} alt="cat" />
            <h2>{name}</h2>
            <h4>{description}</h4>
            <h4>{weight} pounds</h4>
          </div>
        ))}
      </div>
      <div className="ban-list">

      </div>
    </div>
  );
}

export default App
