import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [moveis, setMoveis] = useState([]);

  const carregarMoveis = async () => {
    const snapshot = await getDocs(collection(db, 'moveis'));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMoveis(lista);
  };

  const excluirMovel = async (id) => {
    if (confirm('Tem certeza que deseja excluir este móvel?')) {
      await deleteDoc(doc(db, 'moveis', id));
      carregarMoveis();
    }
  };

  useEffect(() => {
    carregarMoveis();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard - Móveis Cadastrados</h1>
      <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Cadastrar Novo Móvel
      </Link>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {moveis.map(movel => (
          <div key={movel.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{movel.nome}</h2>
            <p className="mb-2">{movel.descricao}</p>
            <div className="flex gap-2">
              <Link
                to={`/editar/${movel.id}`}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Editar
              </Link>
              <Link
                to={`/movel/${movel.id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Página Pública
              </Link>
              <button
                onClick={() => excluirMovel(movel.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
