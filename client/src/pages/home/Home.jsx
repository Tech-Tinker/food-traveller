import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Lógica de inicio de sesión
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Lógica de cierre de sesión
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <MapboxMap />
            {isLoggedIn && <Nav />}
            {/* Muestra Nav solo si isLoggedIn es true */}
        </div>
    );
};

export default Home;
