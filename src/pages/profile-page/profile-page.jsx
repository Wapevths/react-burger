import React, {useEffect, useState} from 'react';
import styles from './profile-page.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { getUserDate } from "../../services/users/selectors";

const ProfilePage = () => {
    const user = useSelector(getUserDate)
    const [name, setName] = useState(user?.name ? user.name : "");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlePostRequestUpdateUser = () => {

    }

    return (
        <div className={styles.containerProfilePage}>
            <div>

            </div>
            <form onSubmit={handlePostRequestUpdateUser}>
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

            </form>
        </div>
    );
};

export default ProfilePage;