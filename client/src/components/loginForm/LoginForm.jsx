import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthService } from '../../services/AuthServices';

const LoginForm = () => {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const auth = AuthService();

    const handleOnChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        auth.login(login).then(res => {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            localStorage.setItem('auth_user_id', res.data.id);
            alert(res.data.message);
        }).catch(error => console.log(error))
    }

    return (
        <div>
            <h2>Bienvenido de nuevo</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleOnChange} value={login.email}></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" onChange={handleOnChange} value={login.password}></input>
                </div>
                <button type="submit">A donde quieres viajar hoy?</button>
                <p>No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
            </form>
        </div>
    )
}

export default LoginForm;
