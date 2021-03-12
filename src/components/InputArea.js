import React, { useState, useEffect } from "react";
import "../App.css";
import { db } from "../firebase/firebase";

export const InputArea = () => {
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

  //インプットエリア
  return (
    <div className="input-area">
      <p className="input-area-title">
        契約名：
        <input
          type="text"
          id="contractName"
          placeholder="契約名を入力"
          value={contractName}
          onChange={(event) => {
            setContractName(event.target.value);
          }}
        />
      </p>
      <p className="input-area-title">
        金額：
        <input
          type="number"
          step="1000"
          placeholder="数字を入力"
          id="contractMoney"
          value={contractMoney}
          onChange={(event) => {
            setContractMoney(event.target.value);
          }}
        />
      </p>
      <p className="input-area-title">
        契約日：
        <input
          type="date"
          id="contractDate"
          value={contractDate}
          onChange={(event) => {
            setContractDate(event.target.value);
          }}
        />
      </p>
      <p className="input-area-title">
        退会URL：
        <input
          type="text"
          id="contractCancel"
          placeholder="https://〜"
          value={contractCancel}
          onChange={(event) => {
            setContractCancel(event.target.value);
          }}
        />
      </p>
      <button className="btn-add" onClick={handleClickAddButton}>
        追加
      </button>
    </div>
  );
}

