import PropTypes from "prop-types";
import styles from "./TransactionCard.module.css";

function TransactionCard({transaction, onContextMenuOpen, contextMenuPosition, onDelete}) {
    const handleContextMenu = (event) => {
        event.preventDefault();
        onContextMenuOpen(transaction.id, event.clientX, event.clientY);
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Вы уверены, что хотите удалить транзакцию "${transaction.description
                                                                         || "Без описания"}"?`)) {
            onDelete(transaction.id);
        }
        onContextMenuOpen(null); // Закрыть меню после действия
    };

    return (
        <div
            className={`${styles.transactionCard} ${
                transaction.type === "income" ? styles.income : styles.expense
            }`}
            onContextMenu={handleContextMenu}
        >
            <div className={styles.header}>
                <span className={styles.type}>
                    {transaction.type === "income" ? "Доход" : "Расход"}
                </span>
                <span className={styles.amount}>
                    {transaction.amount.toLocaleString("ru-RU")} ₽
                </span>
            </div>
            <div className={styles.body}>
                <p className={styles.description}>
                    <strong>Описание:</strong> {transaction.description || "Без описания"}
                </p>
                <p className={styles.date}>
                    <strong>Дата:</strong>{" "}
                    {new Date(transaction.transactionDate).toLocaleDateString("ru-RU")}
                </p>
            </div>

            {contextMenuPosition && (
                <div
                    className={styles.contextMenu}
                    style={{
                        top: contextMenuPosition.y,
                        left: contextMenuPosition.x,
                    }}
                >
                    <button onClick={handleDeleteClick}>Удалить</button>
                </div>
            )}
        </div>
    );
}

TransactionCard.propTypes = {
    transaction: PropTypes.shape({
                                     id: PropTypes.number.isRequired,
                                     type: PropTypes.oneOf(["income", "expense"]).isRequired,
                                     amount: PropTypes.number.isRequired,
                                     description: PropTypes.string,
                                     transactionDate: PropTypes.string.isRequired,
                                 }).isRequired,
    onContextMenuOpen: PropTypes.func.isRequired,
    contextMenuPosition: PropTypes.shape({
                                             x: PropTypes.number,
                                             y: PropTypes.number,
                                         }),
    onDelete: PropTypes.func.isRequired,
};

export default TransactionCard;
