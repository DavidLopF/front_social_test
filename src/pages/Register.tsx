import { useState } from "react";
import { registerUser, loginUser } from "../service/authService";
import { useNavigate, Link } from "react-router-dom";
import { RegisterData } from "../types/auth.types";
import { Form, FormField } from "../components/Form";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const registerData: RegisterData = {
        name,
        email,
        password,
        profileImage: profileImage || undefined
      };

      await registerUser(registerData);
      await loginUser({ email, password });
      navigate("/feed");
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  const fields: FormField[] = [
    {
      id: "email",
      type: "email",
      label: "Correo electrónico",
      value: email,
      onChange: setEmail,
      required: true
    },
    {
      id: "password",
      type: "password",
      label: "Contraseña",
      value: password,
      onChange: setPassword,
      required: true
    },
    {
      id: "confirmPassword",
      type: "password",
      label: "Confirmar contraseña",
      value: confirmPassword,
      onChange: setConfirmPassword,
      required: true
    },
    {
      id: "name",
      type: "text",
      label: "Nombre completo",
      value: name,
      onChange: setName,
      required: true
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro
          </h2>
        </div>
        
        <Form
          fields={fields}
          onSubmit={handleRegister}
          submitText="Registrarse"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
