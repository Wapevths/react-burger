import React, {useState} from 'react';
import styles from "./reset-password-page.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postRequestResetPassword} from "../../services/users/actions";

const ResetPasswordPage = () => {
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePostRequestResetPasswordPage = (event) => {
        event.preventDefault();
        dispatch(postRequestResetPassword(password, code, navigate))
    }
    return (
        <div className={styles.containerResetPasswordPage}>
            <h2 className="text text_type_main-medium pb-6">
                Восстановление пароля
            </h2>
            <form onSubmit={handlePostRequestResetPasswordPage}>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    extraClass="pb-6"
                    placeholder="Введите новый пароль"
                />
                <Input value={code}
                       type={'text'}
                       extraClass="pb-6"
                       onChange={e => setCode(e.target.value)}
                       placeholder="Введите код из письма"
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass={`mb-8`}>
                    Восстановить
                </Button>
            </form>

            <div className={`${styles.containerRegisterReset} pb-4 pt-20`}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Вспомнили пароль?
                </span>
                <Link className={`text text_type_main-default ${styles.linkStyle}`} to='/register'>
                    Зарегистрироваться
                </Link>
            </div>
        </div>
    )
};

export default ResetPasswordPage;