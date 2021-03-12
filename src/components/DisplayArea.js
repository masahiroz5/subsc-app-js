import React, { useState } from "react";
import "../App.css";
import { db } from "../firebase/firebase";

export const DisplayArea = () => {
  
  const [contract, setContract] = useState([]);
  
  const DisplayItems = contract.map((contract, index) => {
    //collectionを削除する関数
    const handleClickDeleteButton = async (index) => {
      const newContract = [...contract];
      const targetContract = newContract.splice(index, 1)[0];
      const targetContractId = targetContract.contractId;
      await db.collection("contract").doc(targetContractId).delete();
      setContract(newContract);
    };
    
    //表示エリア
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
};
