import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Supongamos que isLoggedIn es un estado que indica si el usuario ha iniciado sesión o no.

    // Función para iniciar sesión (simulada).
    const handleLogin = () => {
        // Lógica de inicio de sesión (por ejemplo, autenticación del usuario).
        // Cambia el valor de isLoggedIn a true cuando el usuario inicie sesión.
        setIsLoggedIn(true);
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} /> {/* Pasa el estado isLoggedIn como prop */}
            <MapboxMap />

            {isLoggedIn && <Nav />}
        </div>
    );
};

export default Home;
