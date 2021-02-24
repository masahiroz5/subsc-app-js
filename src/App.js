import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase/firebase";

function App() {
  const [contract, setContract] = useState([]);
  const [contractName, setContractName] = useState("");
  const [contractMoney, setContractMoney] = useState("");
  const [contractDate, setContractDate] = useState("");
  const [contractCancel, setContractCancel] = useState("");

  //データの取得、変更を検知して表示
  useEffect(() => {
    const unsubscribe = db
      .collection("contract")
      .onSnapshot((querySnapshot) => {
        const _contract = querySnapshot.docs.map((doc) => {
          return {
            contractId: doc.id,
            ...doc.data(),
          };
        });
        setContract(_contract);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  //collectionの追加
  const handleClickAddButton = async () => {
    //入力有無の確認
    if (!contractName || !contractMoney || !contractDate || !contractCancel) {
      alert("契約名 or 金額 or 契約日 or 退会URLが空です");
      return;
    }
    await db.collection("contract").add({
      name: contractName,
      money: contractMoney,
      date: contractDate,
      cancel: contractCancel,
    });
    //追加後に初期化
    setContractName("");
    setContractMoney("");
    setContractDate("");
    setContractCancel("");
  };

  //collectionの削除
  const handleClickDeleteButton = async (index) => {
    const newContract = [...contract];
    newContract.splice(index, 1);
    setContract(newContract);
    db.collection("contract").doc().delete();
  };

  //collectionの取得
  const contractListItems = contract.map((contract, index) => {
    return (
      <div key={contract.contractId}>
        <ul>
          <li>
            契約名：{contract.name}
            　　　金額：{contract.money}円 　　　契約日：{contract.date}
            　　　
            <a href={contract.cancel} target="_blank">
              退会はこちら
            </a>
            <button onClick={() => handleClickDeleteButton(index)}>削除</button>
          </li>
        </ul>
      </div>  
    );
  });
  return (
    <div className="App">
      <h1>サブスクリプション管理アプリ</h1>
      <div>
        <label htmlFor="contractName">契約名：</label>
        <input
          type="text"
          id="contractName"
          value={contractName}
          onChange={(event) => {
            setContractName(event.target.value);
          }}
        />
        <label htmlFor="contractMoney">金額：</label>
        <input
          type="number"
          step="1000"
          id="contractMoney"
          value={contractMoney}
          onChange={(event) => {
            setContractMoney(event.target.value);
          }}
        />
        <label htmlFor="contractDate">契約日：</label>
        <input
          type="date"
          id="contractDate"
          value={contractDate}
          onChange={(event) => {
            setContractDate(event.target.value);
          }}
        />
        <label htmlFor="contractCancel">退会URL：</label>
        <input
          type="text"
          id="contractCancel"
          placeholder="https://＊＊＊＊"
          value={contractCancel}
          onChange={(event) => {
            setContractCancel(event.target.value);
          }}
        />
      </div>
      <button onClick={handleClickAddButton}>追加</button>
      <p>{contractListItems}</p>
    </div>
  );
}

export default App;
