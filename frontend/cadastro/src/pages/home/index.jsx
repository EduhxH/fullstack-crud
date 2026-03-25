import Lixo from "../../assets/lixo.png";
import './style.css';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function createUser(e) {
    e.preventDefault();
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
      console.error("Erro ao cadastrar usuário:", error);
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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form onSubmit={createUser}>
        <h1>Cadastro de Usuários</h1>
        <input ref={inputName} name="name" placeholder="Digite seu nome" type="text" />
        <input ref={inputAge} name="age" placeholder="Digite sua idade" type="number" />
        <input ref={inputEmail} name="email" placeholder="Digite seu email" type="email" />
        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Lixo} alt="Excluir" style={{ width: '20px' }} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;