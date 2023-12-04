import React, {useState} from 'react';
import styles from './login-page.module.css'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {postAuthorizeUser} from "../../services/users/actions";
import {useAppDispatch} from "../../hooks/redux-hooks";
const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handlePostRequestLogin = (event:React.FormEvent) => {
        event.preventDefault();
        dispatch(postAuthorizeUser(email, password, navigate))
    }

    return (
        <div className={styles.containerLoginPage}>
            <h2 className="text text_type_main-medium pb-6">
                Вход
            </h2>
            <form onSubmit={handlePostRequestLogin}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    extraClass="pb-6"
                    isIcon={false}
                />

                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="pb-6"
                />
                <Button htmlType="submit" type="primary" size="medium" extraClass={`mb-8`}>
                    Войти
                </Button>
            </form>

            <div className={`${styles.containerRegisterReset} pb-4 pt-20`}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Вы — новый пользователь?
                </span>
                <Link className={`text text_type_main-default ${styles.linkStyle}`} to='/register'>
                    Зарегистрироваться
                </Link>
            </div>
            <div className={styles.containerRegisterReset}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Забыли пароль?
                </span>
                <Link className={`text text_type_main-default ${styles.linkStyle}`} to='/forgot-password'>
                    Восстановить пароль
                </Link>
            </div>
        </div>
    );
};


export default LoginPage;