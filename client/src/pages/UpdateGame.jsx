import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const UpdateGame = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function fetchGame() {
    const response = await fetch(`http://localhost:3000/api/games/${id}`);
    return response.json();
  }
  async function updateGame(updatedGame) {
    const response = await fetch(`http://localhost:3000/api/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGame),
  });
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["game", id],
    queryFn: fetchGame,
  });

  const {mutate} = useMutation({mutationFn: updateGame, onSucess: ()=>{
    queryClient.invalidateQueries(["game"]);
    queryClient.invalidateQueries(["game", id]);
    navigate("/");
  }})

  useEffect(()=> {
    if(data) {
      reset({name:data.name, platform:data.platform, genre:data.genre})
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    mutate({
      name: formData.name, platform: formData.platform, genre: formData.genre,
    })
  };
  
if (isLoading) return <p className="page-container">Loading game...</p>;
  if (isError) return <p className="page-container">Error: {error.message}</p>;

  return (
    <div className="page-container">
      <h2>Update Game (ID: {id})</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container bd-card"
        style={{ padding: "1rem" }}
      >
        <label htmlFor="gameName">Game Name</label>
        <input
          id="gameName"
          type="text"
          placeholder="E.g. Super Mario"
          {...register("name", { required: "Name is required" })}
        />

        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label htmlFor="platform">Platform</label>
        <input
          id="platform"
          type="text"
          placeholder="E.g. Switch, PC"
          {...register("platform", { required: "Platform is required" })}
        />

        {errors.platform && (
          <p style={{ color: "red" }}>{errors.platform.message}</p>
        )}

        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          placeholder="E.g. RPG, Action, Puzzle"
          {...register("genre", { required: "Genre is required" })}
        />

        {errors.genre && <p style={{ color: "red" }}>{errors.genre.message}</p>}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateGame;
