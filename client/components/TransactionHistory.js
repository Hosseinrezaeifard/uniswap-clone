import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { TransactionContext } from "../context/TransactionContext";
import ethLogo from "../assets/eth.png";
import { FiArrowUpRight } from "react-icons/fi";
import { client } from "../lib/SanityClient";

const styles = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
};

const TransactionHistory = () => {
  const { loading, currentAccount } = useContext(TransactionContext);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(async () => {
    if (!loading && currentAccount) {
      const query = `
          *[_type=="users" && _id == "${currentAccount}"] {
            "transactionList": transactions[]->{amount, toAddress, timestamp, txHash}|order(timestamp desc)[0..4]
          }
        `;

      const clientRes = await client.fetch(query);
      if (clientRes[0]?.transactionList == undefined) {
        return;
      } else {
        clientRes[0]?.transactionList.map((obj) =>
          setTransactionHistory((prevState) => [...prevState, obj])
        );
      }
    }
  }, [loading, currentAccount]);
  return (
    <div className={styles.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((tx, i) => (
            <div className={styles.txHistoryItem} key={i}>
              <div className={styles.txDetails}>
                <Image src={ethLogo} height={20} width={20} />
                {tx.amount} == sent to{" "}
                <span className={styles.toAddress}>
                  {tx.toAddress?.substring(0, 6)}...
                </span>
              </div>{" "}
              on{" "}
              <div className={styles.txTimestamp}>
                {" "}
                {new Date(tx?.timestamp).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className={styles.etherscanLink}>
                <a
                  href={`https://rinkeby.etherscan.io/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.etherscanLink}
                >
                  View on Etherscan
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
