import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '../button/Button';

const RegisterForm = () => {
    const navigate = useNavigate();

    const [registerInput, setRegisterInput] = useState({
        name: '',
        email: '',
        password: '',
        birthdate: '',
        country: '',
        error_list: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [culinaryPreferences, setCulinaryPreferences] = useState([]);

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
            birthdate: registerInput.birthdate,
            country: registerInput.country,
            culinaryPreferences: culinaryPreferences,
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
            <form onSubmit={handleSubmit} className="reg-form rounded-0" action="/register" method="POST">
                <h2 className="text-center mb-3">¡Te damos la bienvenida a bordo!</h2>

                <div className="mb-3">
                    
                    <input
                        onChange={handleInput}
                        value={registerInput.name}
                        type="text"
                        name="name"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Nombre"
                    />
                    <span>{registerInput.error_list.name}</span>
                </div>

                <div className="mb-3">
                    <input
                        onChange={handleInput}
                        value={registerInput.email}
                        type="text"
                        name="email"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Email"
                    />
                    <span>{registerInput.error_list.email}</span>
                </div>

                <div className="mb-3">
                    <label htmlFor="birthdate" className="text-black bold">Fecha de Nacimiento</label>
                    <br>
                    </br>
                    <input
                        onChange={handleInput}
                        value={registerInput.birthdate}
                        type="date"
                        name="birthdate"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="country" className="text-black bold">País de Origen</label>
                    <br></br>
                    <select
                        onChange={handleInput}
                        value={registerInput.country}
                        name="country"
                        className="border-0 border-bottom"
                    >
                        <option value="">Selecciona un país</option>
                        <option value="usa">Estados Unidos</option>
                        <option value="canada">Canadá</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="text-black bold">Preferencias Culinarias</label>
                    <div className="culinary-preferences">
                        <button
                            type="button"
                            className={`preference-button ${culinaryPreferences.includes('Italiana') ? 'selected' : ''}`}
                            onClick={() => {
                                if (culinaryPreferences.includes('Italiana')) {
                                    setCulinaryPreferences(culinaryPreferences.filter(p => p !== 'Italiana'));
                                } else {
                                    setCulinaryPreferences([...culinaryPreferences, 'Italiana']);
                                }
                            }}
                        >
                            Italiana
                        </button>
                        <button
                            type="button"
                            className={`preference-button ${culinaryPreferences.includes('Mexicana') ? 'selected' : ''}`}
                            onClick={() => {
                                if (culinaryPreferences.includes('Mexicana')) {
                                    setCulinaryPreferences(culinaryPreferences.filter(p => p !== 'Mexicana'));
                                } else {
                                    setCulinaryPreferences([...culinaryPreferences, 'Mexicana']);
                                }
                            }}
                        >
                            Mexicana
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <input
                        onChange={handleInput}
                        value={registerInput.password}
                        type="password"
                        name="password"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Contraseña"
                    />
                    <span>{registerInput.error_list.password}</span>
                    <br></br>
                    <small id="passwordHelpInline" className="text-muted">
                        Debe tener entre 8 y 20 caracteres.
                    </small>
                </div>
                
                <div className="d-flex justify-content-evenly">
                    <Button backgroundColorClass="bttn-primary" id="aceptButton" text="Regístrate" />
                </div>

                <p className="text-black-50 accede bold " >¿Ya eres miembro? <Link to={`/login`} className="aqui">Inicia tu sesión</Link></p>
            </form>
        </main>
    )
}

export default RegisterForm;
