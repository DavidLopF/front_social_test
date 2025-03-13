import { useState } from "react";
import { loginUser } from "../service/authService";
import { useNavigate, Link } from "react-router-dom";
import { LoginData } from "../types/auth.types";
import { Form, FormField } from "../components/Form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data: LoginData = {
        email,
        password,
      };
      await loginUser(data);
      navigate("/feed");
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
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
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        </div>
        
        <Form
          fields={fields}
          onSubmit={handleLogin}
          submitText="Ingresar"
        >
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Regístrate aquí
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
