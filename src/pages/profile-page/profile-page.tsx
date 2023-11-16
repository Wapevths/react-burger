import React, {useEffect, useRef, useState} from 'react';
import styles from './profile-page.module.css'
import {
    Button,
    EmailInput,
    Input,
    PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {patchUser, postLogoutUser} from "../../services/users/actions";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";

const ProfilePage = () => {
    const user = useAppSelector((state) => state.users.user)
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
    const [isInputActive, setIsInputActive] = useState<boolean>(false);


    const nameRefInput = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const handlePostRequestUpdateUser = (event:React.FormEvent) => {
        event.preventDefault()
        dispatch<any>(patchUser(name, email, password, setIsInputDisabled))
    }

    useEffect(() => {
        if (!isInputDisabled) {
            nameRefInput.current?.focus()
        }
    }, [isInputDisabled])

    const handleOnIconClick = () => {
        setIsInputDisabled(!isInputDisabled)
    }
    const handleDefaultValue = () => {
        setIsInputDisabled(true)
        setIsInputActive(false)

        setName(user.name)
        setEmail(user.email)
    }
    useEffect(() => {
        if (user.name !== undefined) {
            setName(user.name)
            setEmail(user.email)
        }

    }, [user])

    const handleLogout = () => {
        dispatch<any>(postLogoutUser(navigate))
    }

    const inputChangeValue = () => {
        setIsInputActive(true)
    }

    return (
        <div className={styles.containerProfilePage}>
            <div className={styles.containerLeftMenu}>
                <div className={styles.containerLink}>
                    <NavLink to='/profile' className={styles.link}>
                        {({isActive}) => (
                            <span className={`${isActive ? styles.selectLink : ""} text text_type_main-medium`}>
                                Профиль
                            </span>
                        )}
                    </NavLink>
                    <NavLink to='orders' className={styles.link}>
                        {({isActive}) => (
                            <span className={`${isActive ? styles.selectLink : ""} text text_type_main-medium`}>
                                История заказов
                            </span>
                        )}
                    </NavLink>
                    <button className={`${styles.exitButton} text text_type_main-medium`}
                            onClick={handleLogout}
                    >
                        Выход
                    </button>
                </div>

                <div className={styles.containerInfoThisPage}>
                    <span className={`${styles.infoThisPage} text text_type_main-default mt-14 pt-14`}>
                        В этом разделе вы можете
                    </span>
                    <span className={`${styles.infoThisPage} text text_type_main-default`}>
                        изменить свои персональные данные
                    </span>
                </div>

            </div>
            <form onSubmit={handlePostRequestUpdateUser}>
                <Input value={name}
                       type={'text'}
                       disabled={isInputDisabled}
                       icon="EditIcon"
                       onIconClick={handleOnIconClick}
                       extraClass="pb-6"
                       onChange={e => setName(e.target.value)}
                       placeholder="Имя"
                       ref={nameRefInput}
                />

                <EmailInput
                    onChange={() => inputChangeValue()}
                    value={email}
                    name={'email'}
                    extraClass="pb-6"
                    isIcon={true}
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    icon="EditIcon"
                    extraClass="pb-6"
                />
                    <>
                        <Button htmlType="button" type="secondary" size="small" onClick={handleDefaultValue}>
                            Отменить
                        </Button>
                        <Button htmlType="submit" type="primary" size="small">
                            Сохранить
                        </Button>
                    </>
            </form>

        </div>
    );
};

export default ProfilePage;