import React from 'react';
import User from '../../components/User/User';
import Profilerecipes from '../../components/Profile-Recipes/Profilerecipes';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';

const Profile = () => {
    return (
        <div className="d-flex flex-column min-vh-100"> 
            <Header />
            <div className="container mt-4 flex-grow-2"> 
                <User />
                <Profilerecipes />
            </div>
            <Nav />
        </div>
    );
};

export default Profile;
