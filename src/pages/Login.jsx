import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const fazerLogin = () => {
    if (senha === 'admin123') {
      localStorage.setItem('logado', 'true');
      navigate('/dashboard');
    } else {
      alert('Senha incorreta!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Digite a senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button
          onClick={fazerLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
