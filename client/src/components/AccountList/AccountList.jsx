import {useEffect, useState} from "react";
import AccountCard from "../AccountCard/AccountCard.jsx";
import styles from "./AccountList.module.css";
import PropTypes from "prop-types";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal.jsx";

function AccountList({onAccountClick}) {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Загружаем счета с API
    useEffect(() => {
        fetch("http://localhost:8080/api/accounts")
            .then((response) => response.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Error fetching accounts:", error));
    }, []);

    // Открытие модального окна
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Обработчик создания счета
    const handleCreateAccount = (newAccount) => {
        // Отправка запроса на создание нового счета на сервер
        fetch("http://localhost:8080/api/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .then((response) => response.json())
            .then((data) => {
                // Добавляем созданный счет в список аккаунтов
                setAccounts((prevAccounts) => [...prevAccounts, data]);
            })
            .catch((error) => console.error("Error creating account:", error));
    };

    return (
        <div className={styles.container}>
            <h2>Список аккаунтов</h2>

            <div className={styles.accountList}>
                {accounts.map((account) => (
                    <AccountCard
                        key={account.id}
                        account={account}
                        onClick={onAccountClick}
                    />
                ))}
            </div>

            {/* Кнопка для открытия модального окна */}
            <div className={styles.containerBottom}>
                <button onClick={openModal} className={styles.addAccountButton}>
                    Создать аккаунт
                </button>
            </div>

            {/* Модальное окно для создания счета */}
            <CreateAccountModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCreate={handleCreateAccount}
            />
        </div>
    );
}

AccountList.propTypes = {
    onAccountClick: PropTypes.func.isRequired,
};

export default AccountList;
