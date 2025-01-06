import styles from "./AccountCard.module.css";
import PropTypes from "prop-types";

function AccountCard({account, onClick}) {
    return (
        <div className={styles.card} onClick={() => onClick(account.id)}>
            <h3>{account.name}</h3>
            <p>{account.description}</p>
            <p>Initial Balance: {account.initialBalance}</p>
            <p>Created At: {new Date(account.createdAt).toLocaleDateString()}</p>
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
};

export default AccountCard;
