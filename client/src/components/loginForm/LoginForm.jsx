import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
// import { AuthService } from '../../services/AuthServices';
import './LoginForm.css';
import Button from '../button/Button';


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
            window.location.reload();
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
  
    // Función para obtener el nombre de usuario almacenado en localStorage
    const getUserName = () => {
      return localStorage.getItem('auth_name');
    };
  
    // Cerrar sesión
    const handleLogout = () => {
      // Eliminar los datos de usuario almacenados en localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_name');
      localStorage.removeItem('auth_user_id');
      
      // Redirigir a la página de inicio de sesión u otra página de tu elección
      navigate('/login');
    //  window.location.reload();
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
                <input type="email" name="email" onChange={handleOnChange} value={login.email} className="input-none-style border-b"></input>
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="password" className="fw-bold fs-5 label-text text">Contraseña</label>
                <input type="password" name="password" onChange={handleOnChange} value={login.password} className="input-none-style border-b"></input>
              </div>
              <Button backgroundColorClass="bttn-primary" text="Inicia sesión" widthClass="dobleW" />
              <p className="text-center">No tienes cuenta? <Link to="/register" className="fw-bold  link-none-style">Regístrate</Link></p>
            </form>
  
            <span className="error-text">{login.error_list.email}</span>
            <span className="error-text">{login.error_list.password}</span>
          </>
        )}
      </div>
    );
  };
  
  export default LoginForm;