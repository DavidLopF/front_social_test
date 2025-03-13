import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicationsByUserId, deletePublication } from '../service/publicationService';
import { updateUserProfile } from '../service/authService';
import { Publication } from '../types/publication.types';
import PublicationCard from '../components/PublicationCard';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const { userId } = useParams();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    newProfileImage: null as File | null
  });

  const isOwnProfile = user?.id === Number(userId);

  useEffect(() => {
    loadPublications();
  }, [userId]);

  const loadPublications = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    
    try {
      setLoading(true);
      const newPage = reset ? 1 : page;
      const response = await getPublicationsByUserId(Number(userId), newPage, 10);
      
      setPublications(prev => reset ? response.data : [...prev, ...response.data]);
      setHasMore(response.data.length === 10);
      setPage(newPage + 1);
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicationId: number) => {
    try {
      await deletePublication(publicationId);
      setPublications(prev => prev.filter(p => p.id !== publicationId));
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        name: editForm.name !== user?.name ? editForm.name : undefined,
        email: editForm.email !== user?.email ? editForm.email : undefined,
        password: editForm.password || undefined,
        profileImage: editForm.newProfileImage || undefined
      };

      await updateUserProfile(updateData);
      setIsEditing(false);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditForm(prev => ({ ...prev, newProfileImage: file }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={editForm.newProfileImage ? URL.createObjectURL(editForm.newProfileImage) : (user?.profileImage || '/default-avatar.png')}
              alt={user?.name}
              className="w-20 h-20 rounded-full mr-4 object-cover"
            />
            {!isEditing ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            ) : null}
          </div>
          {isOwnProfile && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Editar perfil
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña (opcional)
              </label>
              <input
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dejar en blanco para mantener la actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de perfil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({
                    name: user?.name || '',
                    email: user?.email || '',
                    password: '',
                    newProfileImage: null
                  });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-4">
        {publications.map(publication => (
          <PublicationCard
            key={publication.id}
            publication={publication}
            onDelete={isOwnProfile ? handleDelete : undefined}
          />
        ))}
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