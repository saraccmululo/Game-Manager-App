import { Link } from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function deleteGame(id) {
  const response = await fetch(`http://localhost:3000/api/games/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

const GameList = (props) => {
  const games = props.games;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const {mutate} = useMutation({mutationFn: deleteGame, onSuccess: ()=> {
    queryClient.invalidateQueries(["games"]);
    navigate("/")
  }})

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this game?")){
      mutate(id);
    }
  }


  return (
    <div className="games-grid">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <h3>{game.name}</h3>
          <p>{game.platform}</p>
          <p>{game.genre}</p>
          <div><Link to={`/update/${game.id}`}>Edit</Link></div>
          <button onClick={()=> handleDelete(game.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default GameList;
