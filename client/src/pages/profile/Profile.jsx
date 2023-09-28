import React from 'react'
import User from '../../components/User/User'
import Profilerecipes from '../../components/Profile-Recipes/Profilerecipes'
import Header from '../../components/header/Header'

const Profile = () => {
    return (
        <div>
            <Header />
            <User />
            <Profilerecipes />
        </div>
    )
}

export default Profile