import React, { useContext } from "react";
import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import { RiSettings3Fill } from "react-icons/ri";
import ethLogo from "../assets/eth.png";
import { TransactionContext } from "../context/TransactionContext";
import Modal from "react-modal";
import { useRouter } from "next/router";
import TransactionLoader from "./TransactionLoader";
Modal.setAppElement("#__next");
const styles = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl border border-[#20242A] hover:border-[#41444F] flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const Main = () => {
  const router = useRouter();

  const { formData, handleChange, sendTransaction } =
    useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount } = formData;
    e.preventDefault();

    if (!addressTo || !amount) return;

    sendTransaction();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.formHeader}>
          <div>Swap</div>
          <div>
            <RiSettings3Fill />
          </div>
        </div>
        <div className={styles.transferPropContainer}>
          <input
            className={styles.transferPropInput}
            type="text"
            placeholder="0.0"
            value={formData.amount}
            onChange={(e) => handleChange(e, "amount")}
            pattern="^[0-9]*[.,]?[0-9]*$"
          />
          <div className={styles.currencySelector}>
            <div className={styles.currencySelectorContent}>
              <div className={styles.currencySelectorIcon}>
                <Image src={ethLogo} alt="eth logo" height={20} width={20} />
              </div>
              <div className={styles.currencySelectorTicker}>ETH</div>
              <AiOutlineDown className={styles.currencySelectorArrow} />
            </div>
          </div>
        </div>
        <div className={styles.transferPropContainer}>
          <input
            className={styles.transferPropInput}
            type="text"
            placeholder="0x..."
            value={formData.addressTo}
            onChange={(e) => handleChange(e, "addressTo")}
          />
        </div>
        <div className={styles.confirmButton} onClick={(e) => handleSubmit(e)}>
          Confirm
        </div>
      </div>
      <Modal style={customStyles} isOpen={!!router.query.loading}>
        <TransactionLoader />
      </Modal>
    </div>
  );
};

export default Main;
