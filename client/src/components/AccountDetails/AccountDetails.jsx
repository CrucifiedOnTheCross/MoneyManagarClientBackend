import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import TransactionCard from "../TransactionCard/TransactionCard";
import styles from "./AccountDetails.module.css";

function AccountDetails({account}) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/transactions/account/${account.id}`);
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Ошибка загрузки операций:", error);
            }
        };

        if (account) {
            fetchTransactions();
        }
    }, [account]);

    return (
        <div className={styles.accountDetails}>
            <div className={styles.addInfo}>
                <h2>{account.name}: {account.initialBalance} Рублей</h2>
                <p><strong>Описание:</strong> {account.description}</p>
                <p><strong>Создан:</strong> {new Date(account.createdAt).toLocaleDateString()}</p>
            </div>

            <div className={styles.transactionsList}>
                <h3 className={styles.transactionsTitle}>Операции</h3>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction}/>
                    ))
                ) : (
                     <p className={styles.noTransactions}>Операции отсутствуют</p>
                 )}
            </div>
        </div>
    );
}

AccountDetails.propTypes = {
    account: PropTypes.shape({
                                 id: PropTypes.number.isRequired,
                                 name: PropTypes.string.isRequired,
                                 description: PropTypes.string.isRequired,
                                 initialBalance: PropTypes.number.isRequired,
                                 createdAt: PropTypes.string.isRequired,
                             }).isRequired,
};

export default AccountDetails;
