import {useState} from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import styles from "./AddTransactionModal.module.css";

Modal.setAppElement("#root");

function AddTransactionModal({isOpen, onClose, onAdd, accountId}) {
    const [transaction, setTransaction] = useState({
                                                       type: "income",
                                                       amount: "",
                                                       description: "",
                                                       transactionDate: "",
                                                   });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTransaction((prev) => ({...prev, [name]: value}));
    };

    const handleAddTransaction = async () => {
        if (!transaction.amount || parseFloat(transaction.amount) <= 0) {
            setError("Сумма должна быть больше 0.");
            return;
        }

        if (!transaction.transactionDate) {
            transaction.transactionDate = new Date().toISOString();
        }

        const transactionData = {
            ...transaction,
            accountId,
            amount: parseFloat(transaction.amount),
            // Преобразуем дату в формат ISO 8601 с временем
            transactionDate: new Date(transaction.transactionDate).toISOString(),
        };

        try {
            const response = await fetch("http://localhost:8080/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) {
                throw new Error("Не удалось добавить транзакцию.");
            }

            const result = await response.json();
            onAdd(result);

            setTransaction({
                               type: "income",
                               amount: "",
                               description: "",
                               transactionDate: "",
                           });
            onClose();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2>Добавить транзакцию</h2>
            <form>
                <div>
                    <label>Тип:</label>
                    <select
                        name="type"
                        value={transaction.type}
                        onChange={handleChange}
                    >
                        <option value="income">Доход</option>
                        <option value="expense">Расход</option>
                    </select>
                </div>
                <div>
                    <label>Сумма:</label>
                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={transaction.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Дата:</label>
                    <input
                        type="date"
                        name="transactionDate"
                        value={transaction.transactionDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p style={{color: "red"}}>{error}</p>}

                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleAddTransaction}>
                        Добавить
                    </button>
                    <button type="button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    );
}

AddTransactionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    accountId: PropTypes.number.isRequired,
};

export default AddTransactionModal;
