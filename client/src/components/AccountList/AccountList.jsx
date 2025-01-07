import {useEffect, useState} from "react";
import AccountCard from "../AccountCard/AccountCard.jsx";
import styles from "./AccountList.module.css";
import PropTypes from "prop-types";
import CreateAccountModal from "../CreateAccountModal/CreateAccountModal.jsx";

function AccountList({onAccountClick}) {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/accounts")
            .then((response) => response.json())
            .then((data) => setAccounts(data))
            .catch((error) => console.error("Error fetching accounts:", error));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateAccount = (newAccount) => {
        fetch("http://localhost:8080/api/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
            .then((response) => response.json())
            .then((data) => {
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

            <div className={styles.containerBottom}>
                <button onClick={openModal} className={styles.addAccountButton}>
                    Добавить счет
                </button>
            </div>

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
