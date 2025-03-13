import { useState, useEffect } from 'react';
import { getAllPublications, deletePublication } from '../service/publicationService';
import { Publication } from '../types/publication.types';
import PublicationCard from '../components/PublicationCard';
import CreatePublication from '../components/CreatePublication';
import { useAuthStore } from '../store/authStore';

export default function Feed() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore(state => state.user);

  const loadPublications = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    try {
      setLoading(true);
      const newPage = reset ? 1 : page;
      const response = await getAllPublications(newPage, 10);
      
      setPublications(prev => reset ? response.data : [...prev, ...response.data]);
      setHasMore(response.data.length === 10);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublications(true);
  }, []);

  const handleDelete = async (publicationId: number) => {
    try {
      await deletePublication(publicationId);
      setPublications(prev => prev.filter(p => p.id !== publicationId));
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CreatePublication onPublicationCreated={() => loadPublications(true)} />

      <div className="space-y-4">
        {publications.map(publication => (
          <PublicationCard
            key={publication.id}
            publication={publication}
            onDelete={user?.id === publication.authorId ? handleDelete : undefined}
          />
        ))}

        {publications.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-8">
            No hay publicaciones para mostrar
          </div>
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => loadPublications()}
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Cargar más'}
        </button>
      )}
    </div>
  );
} 