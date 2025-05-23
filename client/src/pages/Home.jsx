import GameList from "../components/GameList";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000'
  : 'https://game-manager-app.onrender.com';

async function fetchGames() {
  const response = await fetch(`${BASE_URL}/api/games`);
  return response.json();
}

const Home = () => {
  
  const { data, isLoading } = useQuery({ queryKey: ["games"], queryFn: fetchGames });

  if(isLoading) return <p>Loading games...</p>
  
  return (
    <div className="page-container">
      <h1>My Games</h1>
      <div className="bg-card" style={{ marginTop: "1rem", padding: "1rem" }}>
        <GameList games={data} />
      </div>
    </div>
  );
};

export default Home;
