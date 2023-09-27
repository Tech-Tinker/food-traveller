import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';

const Home = () => {
    return (
        <div>
            <Header/>
            <MapboxMap />
            <Nav />
        </div>
    );
};

export default Home;
