import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '../button/Button';
// eslint-disable-next-line
import { AuthService } from '../../services/AuthServices';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [registerInput, setRegisterInput] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,

        };

        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('http://localhost:8000/api/register', formData).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_user_id', res.data.id);
                    swal("Success", res.data.message, "success");
                    navigate('/');

                } else {
                    setRegisterInput({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="p-5 fw-bold text-center headline-form-color headline-form-size margin-2 font-size-desktop">¡Te damos la bienvenida a bordo!</h2>
            <form onSubmit={handleSubmit} className="form-register">
                <div className="d-flex flex-column gap-0-5">
                    <label htmlFor="name" className="fw-bold fs-5 label-text text">Nombre</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.name}
                        type="text"
                        name="name"
                        className="input-none-style border-b"
                    />
                </div>
                <span className="error-text text-center">{registerInput.error_list.name}</span>

                <div className="d-flex flex-column gap-0-5">
                    <label htmlFor="email" className="fw-bold fs-5 label-text text">Email</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.email}
                        type="email"
                        name="email"
                        className="input-none-style border-b"
                    />
                </div>
                <span className="error-text text-center">{registerInput.error_list.email}</span>

                <div className="d-flex flex-column gap-0-5">
                    <label htmlFor="password" className="fw-bold fs-5 label-text text">Contraseña</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.password}
                        type="password"
                        name="password"
                        className="input-none-style border-b"
                    />
                </div>
                <span className="error-text text-center">{registerInput.error_list.password}</span>

                <div className="d-flex flex-column justify-content-around align-items-center gap1">
                    <Button backgroundColorClass="bttn-secondary" text="Regístrate" widthClass="dobleW" />
                    <p className="text-center">¿Ya eres miembro? <Link to={`/login`} className="fw-bold  link-none-style">Inicia tu sesión</Link></p>
                </div>
            </form >
        </div >
    )
}

export default RegisterForm;
