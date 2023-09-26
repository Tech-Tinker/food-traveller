import React from 'react'
import Header from '../../components/header/Header'
import LoginForm from '../../components/loginForm/LoginForm'

const Login = () => {
    return (
        <div>
            <Header showAvatar={false} />
            <LoginForm />
        </div>
    )
}

export default Login
