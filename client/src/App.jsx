import './App.css';
import AccountList from "./components/AccountList/AccountList.jsx";
import {useState} from "react";
import PropTypes from "prop-types"; // Импорт PropTypes

function App() {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    return (
        <div className="container">
            <div className="left-block">
                <AccountList onAccountClick={handleAccountClick}/>
            </div>
            <div className="right-block">
                <h2>Информация о счете</h2>
                {selectedAccount ? (
                    <div>
                        <div className="add-info">
                            <p><strong>Name:</strong> {selectedAccount.name}</p>
                            <p><strong>Description:</strong> {selectedAccount.description}</p>
                            <p><strong>Initial Balance:</strong> {selectedAccount.initialBalance}
                            </p>
                            <p><strong>Created At:</strong> {new Date(
                                selectedAccount.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ) : (
                     <span>Счет не выбран, выберите пожалуйста(</span>
                 )}
            </div>
        </div>
    );
}

App.propTypes = {
    selectedAccount: PropTypes.shape({
                                         id: PropTypes.number.isRequired,
                                         name: PropTypes.string.isRequired,
                                         description: PropTypes.string.isRequired,
                                         initialBalance: PropTypes.number.isRequired,
                                         createdAt: PropTypes.string.isRequired,
                                     }),
};

export default App;
