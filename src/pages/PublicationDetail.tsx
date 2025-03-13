import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicationById, getPublicationComments, addComment } from '../service/publicationService';
import { Publication, Comment } from '../types/publication.types';
import PublicationCard from '../components/PublicationCard';
import { useAuthStore } from '../store/authStore';

export default function PublicationDetail() {
  const { id } = useParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (id) {
      loadPublication();
      loadComments(true);
    }
  }, [id]);

  const loadPublication = async () => {
    try {
      const data = await getPublicationById(Number(id));
      setPublication(data);
    } catch (error) {
      console.error('Error al cargar la publicación:', error);
    }
  };

  const loadComments = async (reset = false) => {
    if (!id || loading || (!hasMore && !reset)) return;
    
    try {
      setLoading(true);
      const newPage = reset ? 1 : page;
      const response = await getPublicationComments(Number(id), newPage, 10);
      
      setComments(prev => reset ? response.data : [...prev, ...response.data]);
      setHasMore(response.data.length === 10);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return;

    try {
      const comment = await addComment(Number(id), newComment.trim());
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      if (publication) {
        setPublication({
          ...publication,
          comments: (publication.comments || 0) + 1
        });
      }
    } catch (error) {
      console.error('Error al añadir comentario:', error);
      alert('Error al añadir el comentario');
    }
  };

  if (!publication) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PublicationCard publication={publication} />

      {user && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Comentar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <img
                src={comment.user.profileImage || '/default-avatar.png'}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{comment.user.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => loadComments()}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar más comentarios'}
        </button>
      )}
    </div>
  );
} 