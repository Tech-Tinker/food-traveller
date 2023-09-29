import React from 'react'
import User from '../../components/User/User'
import Profilerecipes from '../../components/Profile-Recipes/Profilerecipes'
import Header from '../../components/header/Header'
import Nav from '../../components/nav/Nav';


const Profile = () => {
    return (
        <div>
            <Header />
            <User />
            <Profilerecipes />
            <Nav />
        </div>
    )
}

export default Profile