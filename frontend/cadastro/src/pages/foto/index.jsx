import { useEffect, useState } from "react";
import peixoto from "../../assets/peixotolindinhodopapai.jpg";
import "./style.css";

export default function Foto() {
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarComentarios() {
    try {
      const res = await fetch("http://localhost:3000/comentarios");
      if (!res.ok) throw new Error("Erro ao carregar comentários");
      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error("Erro ao carregar comentários:", err);
    }
  }

  async function enviarComentario(e) {
    e.preventDefault();

    if (!texto.trim()) return;

    setEnviando(true);
    setErro("");

    try {
      const res = await fetch("http://localhost:3000/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");

      setTexto("");
      await carregarComentarios();
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      setErro("Não foi possível enviar o comentário. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  useEffect(() => {
    carregarComentarios();
  }, []);

  return (
    <div className="foto-page">
      <div className="foto-container">
        <img src={peixoto} className="foto" />
      </div>

      <div className="comentarios-container">
        <h2>Comentários</h2>

        <div className="lista-comentarios">
          {comentarios.map((c) => (
            <div key={c.id} className="comentario">
              {c.texto}
            </div>
          ))}
        </div>

        <form onSubmit={enviarComentario} className="form-comentario">
          <input
            type="text"
            placeholder="Escreve um comentário..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            disabled={enviando}
          />
          <button type="submit" disabled={enviando || !texto.trim()}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {erro && <p className="erro-comentario">{erro}</p>}
      </div>
    </div>
  );
}
