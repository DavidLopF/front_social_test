import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/feed"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="ml-2">Inicio</span>
            </Link>
          </div>

          <div className="flex items-center">
            {user && (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  <img
                    src={user.profileImage || '/default-avatar.png'}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-gray-700 hover:text-red-600 flex items-center"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="ml-2">Cerrar sesión</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 