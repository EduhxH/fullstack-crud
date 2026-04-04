import Lixo from "../../assets/lixo.png";
import './style.css';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [userEdit, setUserEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const response = await api.get(`/usuarios?page=${page}&limit=5`);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function createUser(e) {
    e.preventDefault();
    setErrors({});
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      });
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
      getUsers();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erro ao cadastrar usuário:", error);
      }
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  }

  async function updateUser(e) {
    e.preventDefault();
    try {
      await api.put(`/usuarios/${userEdit.id}`, {
        name: userEdit.name,
        age: userEdit.age,
        email: userEdit.email
      });
      setUserEdit(null);
      getUsers();
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [page]); // re-busca sempre que a página mudar

  return (
    <div className="container">
      <form onSubmit={createUser}>
        <h1>Cadastro de Usuários</h1>

        <input ref={inputName} name="name" placeholder="Digite seu nome" type="text" />
        {errors.name && <span className="error">{errors.name[0]}</span>}

        <input ref={inputAge} name="age" placeholder="Digite sua idade" type="number" />
        {errors.age && <span className="error">{errors.age[0]}</span>}

        <input ref={inputEmail} name="email" placeholder="Digite seu email" type="email" />
        {errors.email && <span className="error">{errors.email[0]}</span>}

        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          {userEdit?.id === user.id ? (
            <form onSubmit={updateUser} className="edit-form">
              <input
                value={userEdit.name}
                onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })}
                placeholder="Nome"
                type="text"
              />
              <input
                value={userEdit.age}
                onChange={(e) => setUserEdit({ ...userEdit, age: e.target.value })}
                placeholder="Idade"
                type="number"
              />
              <input
                value={userEdit.email}
                onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })}
                placeholder="Email"
                type="email"
              />
              <div className="edit-buttons">
                <button type="submit">💾 Salvar</button>
                <button type="button" onClick={() => setUserEdit(null)}>✖ Cancelar</button>
              </div>
            </form>
          ) : (
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
          )}

          {userEdit?.id !== user.id && (
            <div className="card-buttons">
              <button onClick={() => setUserEdit(user)}>✏️ Editar</button>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Lixo} alt="Excluir" style={{ width: '20px' }} />
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Paginação — só aparece se houver mais de 1 página */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            ← Anterior
          </button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            Próxima →
          </button>
        </div>
      )}

    </div>
  );
}

export default Home;