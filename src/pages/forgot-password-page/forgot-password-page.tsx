import React, {useState} from 'react';
import styles from "./forgot-password-page.module.css";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postRequestForgotPassword} from "../../services/users/actions";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlePostRequestForgotPassword = (event:React.FormEvent) => {
        event.preventDefault();
        dispatch<any>(postRequestForgotPassword(email, navigate))
    }

    return (
        <div className={styles.containerForgotPasswordPage}>
            <h2 className="text text_type_main-medium pb-6">
                Восстановление пароля
            </h2>
            <form onSubmit={handlePostRequestForgotPassword}>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    extraClass="pb-6"
                    placeholder="Укажите e-mail"
                    isIcon={false}
                />

                <Button htmlType="submit" type="primary" size="medium" extraClass={`mb-8`}>
                    Восстановить
                </Button>
            </form>

            <div className={`${styles.containerRegisterReset} pb-4 pt-20`}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Вспомнили пароль?
                </span>
                <Link className={`text text_type_main-default ${styles.linkStyle}`} to='/login'>
                    Войти
                </Link>
            </div>
        </div>
    )
};

export default ForgotPasswordPage;