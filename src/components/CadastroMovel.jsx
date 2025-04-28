import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CadastroMovel() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');

  const salvar = async () => {
    if (!nome || !descricao || !imagem) {
      alert('Preencha todos os campos');
      return;
    }
    await addDoc(collection(db, 'moveis'), { nome, descricao, imagem });
    alert('Móvel cadastrado!');
    setNome('');
    setDescricao('');
    setImagem('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Novo Móvel</h1>
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
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Salvar
      </button>
    </div>
  );
}
