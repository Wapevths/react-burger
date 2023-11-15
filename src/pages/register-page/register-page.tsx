import React, {useState} from 'react';
import styles from "./register-page.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {postCreateUser} from "../../services/users/actions";

const RegisterPage = () => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const handlePostRequestRegister = (event:React.FormEvent) => {
        event.preventDefault();
        dispatch<any>(postCreateUser(email, password, name, navigate))
    }

    return (
        <div className={styles.containerRegisterPage}>
            <h2 className="text text_type_main-medium pb-6">
                Регистрация
            </h2>
            <form onSubmit={handlePostRequestRegister}>
                <Input value={name}
                       type={'text'}
                       extraClass="pb-6"
                       onChange={e => setName(e.target.value)}
                       placeholder="Имя"
                />
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
                    Зарегистрироваться
                </Button>
            </form>


            <div className={`pt-20 ${styles.containerRegisterReset}`}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Уже зарегистрированы?
                </span>
                <Link to='/login'
                      className={`text text_type_main-default ${styles.linkStyle}`}
                >
                    Войти
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;