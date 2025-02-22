import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

function CadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Novo estado para 'image'
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviando todos os campos exigidos pela API
      await signUp({ email, password, name, image }); 
      navigate("/"); 
    } catch (error) {
      setErrorMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
      console.error("Erro ao cadastrar:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Cadastro</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Imagem (URL)"
          value={image} // Campo de imagem
          onChange={(e) => setImage(e.target.value)} 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CadastroPage;
