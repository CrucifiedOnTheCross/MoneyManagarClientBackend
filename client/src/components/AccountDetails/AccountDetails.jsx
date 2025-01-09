import PropTypes from "prop-types";
import styles from "./AccountDetails.module.css";

function AccountDetails({account}) {
    return (
        <div className={styles.accountDetails}>
            <div className={styles.addInfo}>
                <h2>{account.name}: {account.initialBalance} Рублей</h2>
                <p><strong>Id:</strong> {account.id}</p>
                <p><strong>Описание:</strong> {account.description}</p>
                <p><strong>Создан:</strong> {new Date(account.createdAt).toLocaleDateString()}</p>
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
