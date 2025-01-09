import PropTypes from "prop-types";
import styles from "./AccountCard.module.css";

function AccountCard({account, onClick, onContextMenuOpen, contextMenuPosition, onDelete}) {
    const handleContextMenu = (event) => {
        event.preventDefault();
        onContextMenuOpen(account.id, event.clientX, event.clientY);
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Вы уверены, что хотите удалить счет "${account.name}"?`)) {
            onDelete(account.id);
        }
        onContextMenuOpen(null); // Закрыть меню после действия
    };

    return (
        <div
            className={styles.card}
            onClick={() => onClick(account)}
            onContextMenu={handleContextMenu}
        >
            <h3>{account.name}</h3>
            <p>{account.description}</p>
            <p>Initial Balance: {account.initialBalance}</p>
            <p>Created At: {new Date(account.createdAt).toLocaleDateString()}</p>

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

AccountCard.propTypes = {
    account: PropTypes.shape({
                                 id: PropTypes.number.isRequired,
                                 name: PropTypes.string.isRequired,
                                 description: PropTypes.string.isRequired,
                                 initialBalance: PropTypes.number.isRequired,
                                 createdAt: PropTypes.string.isRequired,
                             }).isRequired,
    onClick: PropTypes.func.isRequired,
    onContextMenuOpen: PropTypes.func.isRequired,
    contextMenuPosition: PropTypes.shape({
                                             x: PropTypes.number,
                                             y: PropTypes.number,
                                         }),
    onDelete: PropTypes.func.isRequired,
};

export default AccountCard;
