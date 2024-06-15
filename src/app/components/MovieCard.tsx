import React from 'react';
import { useDispatch } from 'react-redux';
import { likeMovie, dislikeMovie, deleteMovie } from '../redux/slices/moviesSlice';

interface MovieCardProps {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

export default function MovieCard({ id, title, category, likes, dislikes }: MovieCardProps){
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeMovie(id));
  };

  const handleDislike = () => {
    dispatch(dislikeMovie(id));
  };

  const handleDelete = () => {
    dispatch(deleteMovie(id));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md m-4 w-80">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm mb-2">{category}</p>
      <div className="flex items-center mb-4">
        <button className="mr-2" onClick={handleLike}>Like 👍</button>
        <button className="mr-2" onClick={handleDislike}>Dislike 👎</button>
        <button onClick={handleDelete}>Delete ❌</button>
      </div>
      <div className="bg-gray-200 rounded-full h-4 w-full">
        <div className="bg-green-500 rounded-full h-4" style={{ width: `${(likes / (likes + dislikes)) * 100}%` }}></div>
      </div>
    </div>
  );
};