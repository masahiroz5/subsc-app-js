import React, { useState, useEffect } from "react";
import "../App.css";
import { db } from "../firebase/firebase";

export const DisplayArea = () => {
  const [contract, setContract] = useState([]);
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

  //collectionの削除
  const handleClickDeleteButton = async (index) => {
    const newContract = [...contract];
    const targetContract = newContract.splice(index, 1)[0];
    const targetContractId = targetContract.contractId;
    await db.collection("contract").doc(targetContractId).delete();
    setContract(newContract);
  };

  //表示エリア
  const contractListItems = contract.map((contract, index) => {
    return (
      <div key={contract.contractId} className="contract-area">
        <ul>
          <li>
            <span className="contract-area-list">契約名：{contract.name}</span>
            <span className="contract-area-list">金額：{contract.money}円</span>
            <span className="contract-area-list">契約日：{contract.date}</span>
            <span className="contract-area-list">
              <a href={contract.cancel} target="_blank">
                退会はこちら
              </a>
            </span>
            <button
              class="btn-delete"
              onClick={() => handleClickDeleteButton(index)}
            >
              削除
            </button>
          </li>
        </ul>
      </div>
    );
  });
  return (
    <div>
      <p>{contractListItems}</p>
    </div>
  );
};
