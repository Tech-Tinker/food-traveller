import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '../button/Button'


const RegisterForm = () => {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
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
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                navigate('/login');
                
            });
        });
    }

    return (
        <main className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="reg-form" action="/register" method="POST">
                <h2 className="text-center mb-3 pink-color border-bottom border-3 pb-2 bold">Regístrate</h2>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label blue-color bold">Nombre</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.name}
                        type="text"
                        name="name"
                        className="form-control placeholder-size"
                    />
                    <span>{registerInput.error_list.name}</span>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label blue-color bold">Email</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.email}
                        type="text"
                        name="email"
                        className="form-control placeholder-size"
                    />
                    <span>{registerInput.error_list.email}</span>

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label blue-color bold">Contraseña</label>
                    <input
                        onChange={handleInput}
                        value={registerInput.password}
                        type="password"
                        name="password"
                        className="form-control placeholder-size"
                    />
                    <span>{registerInput.error_list.password}</span>

                </div>
                <div className="d-flex justify-content-evenly">
                    <Button backgroundColorClass="bttn-primary" text="Regístrate" />
                </div>
                <p className="accede bold">¿Ya eres miembro? <Link to={`/login`} className="aqui">Inicia tu sesión</Link></p>
            </form>
        </main>
    )
}

export default RegisterForm;