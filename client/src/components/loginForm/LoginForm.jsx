import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './LoginForm.css';
import Button from '../button/Button';
import { login } from '../../services/AuthServices';

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleOnChange = (e) => {
    e.persist();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({
        email: loginData.email,
        password: loginData.password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('auth_name', response.data.username);
        localStorage.setItem('auth_user_id', response.data.id);
        swal('Success', response.data.message, 'success');
        navigate('/perfil');
      } else if (response.status === 401) {
        swal('Warning', response.data.message, 'warning');
      } else {
        setLoginData({ ...loginData, error_list: response.data.validation_errors });
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  const getUserName = () => {
    return localStorage.getItem('auth_name');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_name');
    localStorage.removeItem('auth_user_id');
    navigate('/');
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {getUserName() ? (
        <div>
          <p>Bienvenido, {getUserName()}!</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <>
          <h2 className="p-5 fw-bold text-center headline-form-color headline-form-size">A dónde quieres viajar hoy?</h2>
          <form onSubmit={handleOnSubmit} className="d-flex flex-column justify-content-around reg-form">
            <div className="d-flex flex-column">
              <label htmlFor="email" className="fw-bold fs-5 label-text text">Email</label>
              <input type="email" name="email" onChange={handleOnChange} value={loginData.email} className="input-none-style border-b"></input>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="password" className="fw-bold fs-5 label-text text">Contraseña</label>
              <input type="password" name="password" onChange={handleOnChange} value={loginData.password} className="input-none-style border-b"></input>
            </div>
            <Button backgroundColorClass="bttn-primary" text="Inicia sesión" widthClass="dobleW" />
            <p className="text-center">No tienes cuenta? <Link to="/register" className="fw-bold  link-none-style">Regístrate</Link></p>
          </form>

          {loginData.error_list.email && <span className="error-text">{loginData.error_list.email}</span>}
          {loginData.error_list.password && <span className="error-text">{loginData.error_list.password}</span>}
        </>
      )}
    </div>
  );
};

export default LoginForm;
