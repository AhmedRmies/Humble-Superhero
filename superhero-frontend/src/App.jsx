import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState("");

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    const response = await fetch("http://localhost:3000/superheroes");
    const data = await response.json();
    setSuperheroes(data);
  };

  const addSuperhero = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/superheroes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        superpower,
        humilityScore: parseInt(humilityScore),
      }),
    });
    const data = await response.json();
    setSuperheroes([...superheroes, data]);
    setName("");
    setSuperpower("");
    setHumilityScore("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Humble Superheroes
      </h1>
      <form
        onSubmit={addSuperhero}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Humility Score (1-10)"
            value={humilityScore}
            onChange={(e) => setHumilityScore(e.target.value)}
            min="1"
            max="10"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Superhero
        </button>
      </form>
      <ul className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        {superheroes.map((hero) => (
          <li
            key={hero.id}
            className="p-3 border-b last:border-b-0 text-gray-700"
          >
            <span className="font-semibold">{hero.name}</span> - {hero.superpower}{" "}
            <span className="text-sm text-gray-500">
              (Humility: {hero.humilityScore})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
