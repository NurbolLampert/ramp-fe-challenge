import { InputCheckbox } from "../InputCheckbox";
import { useTransactions } from "src/utils/TransactionContext";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({ transaction: propTransaction, loading }) => {
  const { transactions, setTransactionApproval } = useTransactions();
  const transaction = transactions?.find(t => t.id === propTransaction.id) || propTransaction;


  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={transaction.approved}
        disabled={loading}
        onChange={async (newValue) => {
          await setTransactionApproval(transaction.id, newValue);
        }}
      />
    </div>
  );
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
