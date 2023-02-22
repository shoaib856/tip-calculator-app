import { useEffect, useState } from "react";
import "./App.scss";
import logo from "./images/logo.svg";
import dollar from "./images/icon-dollar.svg";
import person from "./images/icon-person.svg";

function App() {
  const [bill, setBill] = useState("");
  const [peopleNum, setPeopleNum] = useState("");
  const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [zeroPeople, setZeroPeople] = useState(false);
  // const [customTip, setCustomTip] = useState(0);

  const handleBillChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");
    value =
      value.indexOf(".") === value.lastIndexOf(".")
        ? value
        : value.slice(0, -1);
    setBill(value);
  };

  const handlePeopleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    setPeopleNum(value);
    setZeroPeople(value === "0");
  };

  const handleTipChange = (e) => {
    setTip(Number(e.target.value));
  };

  const handleReset = () => {
    setBill("");
    setPeopleNum("");
  };

  const tipAmountCalculate = (bill, tip, peopleNum) => {
    let x = (parseFloat(bill) * tip) / parseInt(peopleNum);
    setTipAmount(isNaN(x) ? 0.0 : isFinite(x) ? x : 0.0);
  };

  const totalCalculate = (bill, tipAmount, peopleNum) => {
    let x = parseFloat(bill) / parseInt(peopleNum) + tipAmount;
    setTotal(isNaN(x) ? 0.0 : isFinite(x) ? x : 0.0);
  };

  useEffect(() => {
    tipAmountCalculate(bill, tip, peopleNum);
    totalCalculate(bill, tipAmount, peopleNum);
  });
  return (
    <div className="App">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="container">
        <div className="input-bill">
          <label className="bill">
            <img src={dollar} alt="dollar" />
            <p>Bill</p>
            <input type="text" value={bill} onInput={handleBillChange} />
          </label>
          <div className="tip-selector">
            <p>Select Tip %</p>
            <ul className="tips">
              <li className="tip-btn">
                <label>
                  5%
                  <input
                    type="radio"
                    name="tip-group"
                    value={0.05}
                    onChange={handleTipChange}
                  />
                </label>
              </li>
              <li className="tip-btn">
                <label>
                  10%
                  <input
                    type="radio"
                    name="tip-group"
                    value={0.1}
                    onChange={handleTipChange}
                  />
                </label>
              </li>
              <li className="tip-btn">
                <label>
                  15%
                  <input
                    type="radio"
                    name="tip-group"
                    value={0.15}
                    onChange={handleTipChange}
                  />
                </label>
              </li>
              <li className="tip-btn">
                <label>
                  25%
                  <input
                    type="radio"
                    name="tip-group"
                    value={0.25}
                    onChange={handleTipChange}
                  />
                </label>
              </li>
              <li className="tip-btn">
                <label>
                  50%
                  <input
                    type="radio"
                    name="tip-group"
                    value={0.5}
                    onChange={handleTipChange}
                  />
                </label>
              </li>
              <li className="tip-btn">
                <label>
                  {""}
                  <input type="radio" name="tip-group" />
                  <input
                    type="text"
                    name="tip-group"
                    className="custom"
                    placeholder="Custom"
                    onInput={(e) => setTip(parseInt(e.target.value) / 100)}
                    onFocus={(e) => (e.target.previousSibling.checked = true)}
                  />
                </label>
              </li>
            </ul>
          </div>
          <label className="people-num">
            <img src={person} alt="person" />
            <p>
              Number of People{" "}
              <span style={{ display: zeroPeople ? "block" : "none" }}>
                Can't be zero
              </span>
            </p>
            <input
              type="text"
              value={peopleNum}
              onInput={handlePeopleChange}
              style={{ borderColor: zeroPeople && "red" }}
              onBlur={(e) => (e.target.style.borderColor = "transparent")}
              onFocus={(e) => {
                e.target.style.borderColor =
                  e.target.value === "0" ? "red" : "hsl(172, 67%, 45%)";
              }}
            />
          </label>
        </div>
        <div className="output">
          <div className="result">
            <div className="result-desc">
              <div className="tip-amount">
                <div className="desc">
                  <p>Tip Amount</p>
                  <small>/ person</small>
                </div>
                <h1>${tipAmount.toFixed(2)}</h1>
              </div>
              <div className="total">
                <div className="desc">
                  <p>Total</p>
                  <small>/ person</small>
                </div>
                <h1>${total.toFixed(2)}</h1>
              </div>
            </div>
            <input type="reset" value={"RESET"} onClick={handleReset} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
