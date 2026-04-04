import { useEffect, useState } from "react";
import peixoto from "../../assets/peixotolindinhodopapai.jpg";
import "./style.css";

export default function Foto() {
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");

  async function carregarComentarios() {
    const res = await fetch("http://localhost:3000/comentarios");
    const data = await res.json();
    setComentarios(data);
  }

  async function enviarComentario(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto })
    });

    setTexto("");
    carregarComentarios();
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
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
}
