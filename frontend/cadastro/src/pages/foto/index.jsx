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
      const res = await fetch("https://fullstack-crud-foud.onrender.com/comentarios");
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
      const res = await fetch("https://fullstack-crud-foud.onrender.com/comentarios", {
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

      {/* ── COLUNA ESQUERDA: FOTO ── */}
      <div className="foto-col-left">
        <a href="/home" className="btn-voltar">← Voltar</a>
        <span className="foto-label">📸 Galeria</span>
        <div className="foto-wrapper">
          <img src={peixoto} className="foto" alt="Peixoto" />
          <div className="foto-overlay" />
        </div>
      </div>

      {/* ── COLUNA DIREITA: COMENTÁRIOS ── */}
      <div className="comentarios-col">
        <div className="comentarios-header">
          <h2>Comentários</h2>
          <span className="comentarios-count">
            {comentarios.length} {comentarios.length === 1 ? "comentário" : "comentários"}
          </span>
        </div>

        <div className="lista-comentarios">
          {comentarios.length === 0 ? (
            <p className="sem-comentarios">Ainda não há comentários. Seja o primeiro!</p>
          ) : (
            comentarios.map((c) => (
              <div key={c.id} className="comentario">
                {c.texto}
              </div>
            ))
          )}
        </div>

        <div className="form-comentario-wrapper">
          <p>Deixa o teu comentário</p>
          <form onSubmit={enviarComentario} className="form-comentario">
            <input
              type="text"
              placeholder="Escreve algo..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              disabled={enviando}
            />
            <button type="submit" disabled={enviando || !texto.trim()}>
              {enviando ? "A enviar..." : "Enviar"}
            </button>
          </form>
          {erro && <p className="erro-comentario">{erro}</p>}
        </div>
      </div>

    </div>
  );
}
