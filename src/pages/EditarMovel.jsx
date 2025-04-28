import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditarMovel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    async function carregarMovel() {
      const ref = doc(db, 'moveis', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const dados = snap.data();
        setNome(dados.nome);
        setDescricao(dados.descricao);
        setImagem(dados.imagem);
      }
    }
    carregarMovel();
  }, [id]);

  const salvar = async () => {
    if (!nome || !descricao || !imagem) {
      alert('Preencha todos os campos');
      return;
    }
    const ref = doc(db, 'moveis', id);
    await updateDoc(ref, { nome, descricao, imagem });
    alert('Móvel atualizado!');
    navigate('/dashboard');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Móvel</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Nome do móvel"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Descrição"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-4"
        placeholder="URL da imagem"
        value={imagem}
        onChange={e => setImagem(e.target.value)}
      />
      <button
        onClick={salvar}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Salvar Alterações
      </button>
    </div>
  );
}
