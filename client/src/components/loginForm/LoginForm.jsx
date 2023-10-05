import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './LoginForm.css';
import axios from 'axios';
import Button from '../button/Button';
// eslint-disable-next-line
import { login } from '../../services/AuthServices';

const LoginForm = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  // const auth = AuthService();

  const handleOnChange = (e) => {
    e.persist();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: login.email,
      password: login.password,
    };

    axios.get('http://localhost:8000/sanctum/csrf-cookie').then((response) => {
      axios.post(`http://localhost:8000/api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_user_id', res.data.id);
          // window.location.reload();
          swal('Success', res.data.message, 'success');
          navigate('/');
        } else if (res.data.status === 401) {
          swal('Warning', res.data.message, 'warning');
        } else {
          setLogin({ ...login, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="p-5 fw-bold text-center headline-form-color headline-form-size">A dónde quieres viajar hoy?</h2>
      <form onSubmit={handleOnSubmit} className="form-login">
        <div className="d-flex flex-column">
          <label htmlFor="email" className="fw-bold fs-5 label-text text">Email</label>
          <input type="email" name="email" onChange={handleOnChange} value={login.email} className="input-none-style border-b"></input>
        </div>
        <span className="error-text text-center">{login.error_list.email}</span>

        <div className="d-flex flex-column">
          <label htmlFor="password" className="fw-bold fs-5 label-text text">Contraseña</label>
          <input type="password" name="password" onChange={handleOnChange} value={login.password} className="input-none-style border-b"></input>
        </div>
        <span className="error-text text-center">{login.error_list.password}</span>

        <div className="d-flex flex-column justify-content-around align-items-center gap1">
          <Button backgroundColorClass="bttn-secondary" text="Iniciar sesión" widthClass="dobleW" />
          <p className="text-center">No tienes cuenta? <Link to="/register" className="fw-bold  link-none-style">Regístrate</Link></p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;
