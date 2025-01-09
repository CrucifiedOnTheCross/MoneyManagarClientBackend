import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./TransactionList.module.css";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal.jsx";
import TransactionCard from "../TransactionCard/TransactionCard.jsx";

function TransactionList({accountId}) {
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeContextMenu, setActiveContextMenu] = useState(null); // Добавляем состояние для
                                                                      // контекстного меню

    useEffect(() => {
        if (accountId) {
            fetch(`http://localhost:8080/api/transactions/account/${accountId}`)
                .then((response) => response.json())
                .then((data) => {
                    const sortedData = data.sort(
                        (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
                    setTransactions(sortedData);
                })
                .catch((error) => console.error("Ошибка при загрузке транзакций:", error));
        }
    }, [accountId]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddTransaction = (newTransaction) => {
        setTransactions((prev) => {
            const updatedTransactions = [...prev, newTransaction].sort(
                (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
            return updatedTransactions;
        });
    };

    const handleContextMenuOpen = (id, x = null, y = null) => {
        setActiveContextMenu(id ? {id, x, y} : null);
    };

    const handleDeleteTransaction = (id) => {
        fetch(`http://localhost:8080/api/transactions/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setTransactions((prevTransactions) => prevTransactions.filter(
                    (transaction) => transaction.id !== id));
                setActiveContextMenu(null); // Закрыть контекстное меню
            })
            .catch((error) => console.error("Ошибка при удалении транзакции:", error));
    };

    const groupTransactionsByDate = (transactions) => {
        return transactions.reduce((groups, transaction) => {
            const date = new Date(transaction.transactionDate).toLocaleDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(transaction);
            return groups;
        }, {});
    };

    const groupedTransactions = groupTransactionsByDate(transactions);

    return (<div className={styles.container}>
        <h2>Транзакции</h2>
        <button onClick={handleOpenModal} className={styles.addButton}>
            Добавить транзакцию
        </button>

        {transactions.length > 0 ? (<div className={styles.transactionList}>
            {Object.keys(groupedTransactions)
                .map((date) => (<div key={date} className={styles.transactionGroup}>
                    <h3 className={styles.dateHeader}>{date}</h3>
                    {groupedTransactions[date].map((transaction) => (<TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onContextMenuOpen={handleContextMenuOpen}
                        contextMenuPosition={activeContextMenu
                                             && activeContextMenu.id
                                             === transaction.id ? {
                            x: activeContextMenu.x,
                            y: activeContextMenu.y
                        } : null}
                        onDelete={handleDeleteTransaction}
                    />))}
                </div>))}
        </div>) : (<p>Нет транзакций для этого счета.</p>)}

        <AddTransactionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAdd={handleAddTransaction}
            accountId={accountId}
        />
    </div>);
}

TransactionList.propTypes = {
    accountId: PropTypes.number.isRequired,
};

export default TransactionList;
