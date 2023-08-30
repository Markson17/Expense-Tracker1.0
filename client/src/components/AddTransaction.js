import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';
import "../App.css";  

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [submit, setSubmit] = useState(false);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = async(e) => {
    e.preventDefault();
    setSubmit(true);

    const newTransaction = {
      text,
      amount: +amount
    }

    await addTransaction(newTransaction);
    setSubmit(false);
    setAmount(0);
    setText('');
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn" disabled={submit}>{submit?<div className='loader'></div>:"Add transaction"}</button>
      </form>
    </>
  )
}
