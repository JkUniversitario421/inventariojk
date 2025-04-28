import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

export default function MovelPage() {
  const { id } = useParams();
  const [movel, setMovel] = useState(null);

  useEffect(() => {
    async function carregarMovel() {
      const ref = doc(db, 'moveis', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setMovel(snap.data());
      }
    }
    carregarMovel();
  }, [id]);

  if (!movel) {
    return <div className="p-4 text-center">Carregando móvel...</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-4">{movel.nome}</h1>
      {movel.imagem && (
        <img
          src={movel.imagem}
          alt={movel.nome}
          className="w-full h-auto mb-4 rounded"
        />
      )}
      <p className="text-lg">{movel.descricao}</p>
    </div>
  );
}
