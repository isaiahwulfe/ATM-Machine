const ATMDeposit = ({ onChange, isDeposit, atmMode, isValid }) => {
  const choice = ["Deposit", "Withdraw"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge" style={{position: 'absolute', left: '50%', transform: 'translate(-50%)'}}>
      {atmMode && <h3 style={{textAlign: 'left'}}> Amount:</h3>}
      {atmMode && <input className="number" type="number" width="200" onChange={onChange}></input>}
      {atmMode && <input className="submit" type="submit" width="200" value={choice[Number(!isDeposit)]} disabled={isValid}></input>}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0); // state of this transaction
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if(event.target.value <= 0){return setValidTransaction(false)}
    if(atmMode == "Cash Back" && Number(event.target.value) > totalState){setValidTransaction(false)}
    else{return setValidTransaction(true)}
  };
  const handleSubmit = () => {
    let newTotal = isDeposit ? totalState + deposit : checkBalance(totalState, deposit);
    setTotalState(newTotal);
    event.preventDefault();
  };

  const checkBalance = (totalState, deposit) => {
    if(deposit <= totalState){
      return totalState - deposit;
    }
    else{
      alert(`Insufficient Funds`);
      return totalState;
    }
  }

  const handleModeSelect = (e) => {
    if(event.target.value == "Deposit"){
      setAtmMode(event.target.value);
      setIsDeposit(true)
    }
    if(event.target.value == "Cash Back"){
      setAtmMode(event.target.value);
      setIsDeposit(false)
    }
  }

  return (
    <div style={{position: 'absolute', left: '50%', transform: 'translate(-50%)'}}>
      <form onSubmit={handleSubmit}>
        <h2 id="total" style={{textAlign: 'center'}}>{status}</h2>
        <label style={{paddingRight: '5px'}}>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Withdraw</option>
        </select>
        <br></br>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={!validTransaction}></ATMDeposit>
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));