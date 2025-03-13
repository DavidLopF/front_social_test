import { useState } from 'react';
import { Publication } from '../types/publication.types';
import { toggleLike } from '../service/publicationService';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

interface Props {
  publication: Publication;
  onDelete?: (id: number) => void;
}

export default function PublicationCard({ publication, onDelete }: Props) {
  const user = useAuthStore(state => state.user);
  const [likes, setLikes] = useState(publication.receivedLikes);
  const isLiked = likes.some(like => like.userId === user?.id);

  const handleLike = async () => {
    try {
      await toggleLike(publication.id);
      if (isLiked) {
        // Remover el like
        setLikes(prevLikes => prevLikes.filter(like => like.userId !== user?.id));
      } else {
        // Agregar el like
        const newLike = {
          id: Date.now(), // ID temporal
          userId: user?.id || 0,
          publicationId: publication.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            id: user?.id || 0,
            name: user?.name || ''
          }
        };
        setLikes(prevLikes => [...prevLikes, newLike]);
      }
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={publication.author.profileImage || '/default-avatar.png'}
          alt={publication.author.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <Link to={`/profile/${publication.authorId}`} className="font-semibold text-gray-900 hover:underline">
            {publication.author.name}
          </Link>
          <p className="text-sm text-gray-500">
            {new Date(publication.createdAt).toLocaleDateString()}
          </p>
        </div>
        {user?.id === publication.authorId && onDelete && (
          <button
            onClick={() => onDelete(publication.id)}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">{publication.title}</h3>
      <p className="text-gray-700 mb-4">{publication.content}</p>
      
      {publication.image && (
        <img
          src={publication.image}
          alt={publication.title}
          className="w-full rounded-lg mb-4"
        />
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            isLiked ? 'text-blue-600' : 'text-gray-600'
          } hover:text-blue-700`}
        >
          <svg
            className="w-5 h-5"
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{likes.length}</span>
        </button>

        <Link
          to={`/publication/${publication.id}`}
          className="flex items-center gap-1 text-gray-600 hover:text-blue-700"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{publication.receivedComments.length}</span>
        </Link>
      </div>
    </div>
  );
} 