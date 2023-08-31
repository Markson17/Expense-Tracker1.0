import { AddTransaction } from "../components/AddTransaction";
import { Balance } from "../components/Balance";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { TransactionList } from "../components/TransactionList";

const Dashboard = () => {
    // const { user } = useContext(AuthContext);
    return (
        <div>
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
        </div>
    );
    }

export default Dashboard;