import './App.css';
import AccountList from "./components/AccountList/AccountList.jsx";
import TransactionList from "./components/TransactionList/TransactionList.jsx";
import {useState} from "react";
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";
import MonthlyStatisticsChart from './components/MonthlyStatisticsChart/MonthlyStatisticsChart.jsx'; // Импортируем компонент

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
                    <>
                        <AccountDetails account={selectedAccount}/>
                        <MonthlyStatisticsChart
                            accountId={selectedAccount.id}/> {/* Добавляем график */}
                        <TransactionList accountId={selectedAccount.id}/>
                    </>
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
