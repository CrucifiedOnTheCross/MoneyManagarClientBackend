import {useState} from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import styles from "./CreateAccountModal.module.css"; // Подключаем CSS-модуль

Modal.setAppElement("#root");

function CreateAccountModal({isOpen, onClose, onCreate}) {
    const [newAccount, setNewAccount] = useState({
                                                     name: "",
                                                     description: "",
                                                     initialBalance: "0",
                                                     createdAt: new Date().toISOString(),
                                                 });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateAccount = async () => {
        const today = new Date().toISOString(); // Получаем текущую дату в формате ISO
        if (newAccount.createdAt > today) {
            setError("Дата создания не может быть в будущем.");
            return;
        }

        if (!newAccount.name || parseFloat(newAccount.initialBalance) < 0) {
            setError("Имя счета не может быть пустым и сумма должна быть больше 0.");
            return;
        }

        // Преобразование данных в нужный формат
        const accountData = {
            name: newAccount.name,
            description: newAccount.description,
            initialBalance: newAccount.initialBalance,
            createdAt: newAccount.createdAt,
        };

        // Отправляем запрос на сервер
        try {
            const response = await fetch("http://localhost:8080/api/accounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(accountData), // Отправляем данные аккаунта
            });

            if (!response.ok) {
                throw new Error("Не удалось создать аккаунт");
            }

            const result = await response.json();
            onCreate(result);

            setNewAccount({
                              name: "",
                              description: "",
                              initialBalance: "0",
                              createdAt: new Date().toISOString(),
                          });

            onClose();
        } catch (error) {
            setError("Произошла ошибка при создании аккаунта: " + error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2>Создать новый аккаунт</h2>
            <form>
                <div>
                    <label htmlFor="name">Имя счета:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newAccount.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newAccount.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="initialBalance">Начальный баланс:</label>
                    <input
                        type="number"
                        id="initialBalance"
                        name="initialBalance"
                        value={newAccount.initialBalance}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="createdAt">Дата создания:</label>
                    <input
                        type="datetime-local"
                        id="createdAt"
                        name="createdAt"
                        value={newAccount.createdAt.slice(0, 16)} // Обрезаем время до минут
                        onChange={handleChange}
                    />
                </div>

                {/* Сообщение об ошибке */}
                {error && <p style={{color: "red"}}>{error}</p>}

                <div>
                    <button type="button" onClick={handleCreateAccount}>
                        Создать
                    </button>
                    <button type="button" onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </form>
        </Modal>
    );
}

CreateAccountModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export default CreateAccountModal;
