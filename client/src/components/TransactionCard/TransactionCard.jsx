// components/TransactionCard/TransactionCard.jsx
import PropTypes from "prop-types";
import styles from "./TransactionCard.module.css";

function TransactionCard({transaction}) {
    return (
        <div className={styles.transactionCard}>
            <h4 className={styles.title}>
                {transaction.type === "income" ? "Доход" : "Расход"}: {transaction.amount} Рублей
            </h4>
            <p className={styles.text}><strong>Описание:</strong> {transaction.description}</p>
            <p className={styles.text}><strong>Дата:</strong> {new Date(
                transaction.transactionDate).toLocaleDateString()}</p>
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
};

export default TransactionCard;
