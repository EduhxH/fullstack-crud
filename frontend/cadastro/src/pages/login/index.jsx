import { useState } from 'react';
import api from '../../services/api';
import './style.css';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setGlobalError('');

    const endpoint = isRegister ? '/auth/register' : '/auth/login';

    try {
      const response = await api.post(endpoint, { email, password });

      if (isRegister) {
        // Após registar, muda para login automaticamente
        setIsRegister(false);
        setEmail('');
        setPassword('');
        alert('Conta criada! Faz login agora.');
      } else {
        // Guarda o token e redireciona
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.error) {
        setGlobalError(error.response.data.error);
      }
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>{isRegister ? 'Criar Conta' : 'Login'}</h1>

        {globalError && <span className="error global">{globalError}</span>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email[0]}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password[0]}</span>}

        <button type="submit">{isRegister ? 'Registar' : 'Entrar'}</button>

        <p onClick={() => setIsRegister(!isRegister)} className="toggle">
          {isRegister ? 'Já tens conta? Faz login' : 'Não tens conta? Regista-te'}
        </p>
      </form>
    </div>
  );
}

export default Login;