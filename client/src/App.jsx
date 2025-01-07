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

                {selectedAccount ? (
                    <div>
                        <div className="add-info">
                            <h2>{selectedAccount.name}: {selectedAccount.initialBalance} Рублей</h2>
                            <p><strong>Описание:</strong> {selectedAccount.description}</p>
                            <p><strong>Создан:</strong> {new Date(
                                selectedAccount.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ) : (
                     <div>
                         <h2>Выберите счет</h2>
                         <span>Мы будем рады показать вам информацию о вашем счете :)</span>
                     </div>
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
