import './App.css';
import AccountList from "./components/AccountList/AccountList.jsx";
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";
import {useState} from "react";

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
                    <AccountDetails account={selectedAccount}/>
                ) : (
                     <div>
                         <h2>Выберите счет в списке слева</h2>
                         <span>Мы будем рады показать вам информацию о вашем счете :)</span>
                     </div>
                 )}
            </div>
        </div>
    );
}

export default App;
