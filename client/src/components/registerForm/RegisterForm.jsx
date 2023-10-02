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

    const [aceptado, setAceptado] = useState(false);



    const handleInput = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }

    const handleAceptoCambio = () => {
        setAceptado(!aceptado);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!aceptado) {
            return;
        }

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
                    // navigate('/login');
                    navigate('/');

                } else {
                    setRegisterInput({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="reg-form rounded-0" action="/register" method="POST">
                <h2 className="title-register text-center bold mb-3">¡Te damos la bienvenida <br></br>a bordo!</h2>
                <div className="container-input">
                    <div className="mb-3 text-center">

                        <input
                            onChange={handleInput}
                            value={registerInput.name}
                            type="text"
                            name="name"
                            className="input-register text-left border-0 border-bottom border-2 border-dark"
                            placeholder="Nombre"
                        />

                        <span className="error-required">{registerInput.error_list.name}</span>
                    </div>

                    <div className="mb-3 text-center input-login">
                        <input
                            onChange={handleInput}
                            value={registerInput.email}
                            type="text"
                            name="email"
                            className="input-register text-left border-0 border-bottom border-2 border-dark"
                            placeholder="Email"
                        />
                        <span className="error-required">{registerInput.error_list.email}</span>
                    </div>



                    <div className="mb-3 text-center">
                        <input
                            onChange={handleInput}
                            value={registerInput.password}
                            type="password"
                            name="password"
                            className="input-register text-left border-0 border-bottom border-2 border-dark"
                            placeholder="Contraseña"
                        />
                        <span className="error-required">{registerInput.error_list.password}</span>
                        <br></br>
                    </div>
                </div>
                <div className="terminos-y-condiciones-container">
                    <label>
                        <input className="checkbox"
                            type="checkbox"
                            checked={aceptado}
                            onChange={handleAceptoCambio}
                        />
                    </label>
                    <span className="terminos-y-condiciones-text">
                        Acepto los <Link to="">términos y condiciones </Link> de la política de protección de datos.<br></br> Recibirás confirmación del registro por correo electrónico.
                    </span>
                </div>



                <div className="d-flex justify-content-evenly">
                    <Button backgroundColorClass="button-register bttn-secondary" id="aceptButton" text="Regístrate" />
                </div>

                <p className="text-black-50 accede bold " >¿Ya eres miembro? <Link to={`/login`} className="aqui">Inicia tu sesión</Link></p>
            </form>
        </div>
    )
}

export default RegisterForm;
