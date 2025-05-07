import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const createGame = async (newGame) => {
  const response = await fetch("http://localhost:3000/api/games", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGame),
  });
  return response.json();
};

const CreateGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries(["games"]);
      navigate("/");
    },
  });

  const onSubmit = (formData) => {
    mutate({
      name: formData.name,
      platform: formData.platform,
      genre: formData.genre,
    });
  };

  return (
    <div className="page-container">
      <h2>Add a New Game</h2>
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

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateGame;
