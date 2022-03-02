import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import uniswapLogo from "../assets/uniswap.png";
import ethLogo from "../assets/eth.png";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/methods";

const styles = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex w-2/4 justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
};

const Header = () => {
  const [selectedNav, setSelectedNav] = useState("swap");
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  console.log(currentAccount, connectWallet);
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLogo}>
        <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
      </div>
      <div className={styles.nav}>
        <div className={styles.navItemsContainer}>
          <div
            onClick={() => setSelectedNav("swap")}
            className={`${styles.navItem} ${
              selectedNav === "swap" && styles.activeNavItem
            }`}
          >
            Swap
          </div>
          <div
            onClick={() => setSelectedNav("pool")}
            className={`${styles.navItem} ${
              selectedNav === "pool" && styles.activeNavItem
            }`}
          >
            Pool
          </div>
          <div
            onClick={() => setSelectedNav("vote")}
            className={`${styles.navItem} ${
              selectedNav === "vote" && styles.activeNavItem
            }`}
          >
            Vote
          </div>
          <a
            className={styles.navItem}
            href="https://info.uniswap.org/#/"
            target="_blank"
            rel="noreferrer"
          >
            Charts <FiArrowUpRight />
          </a>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <div className={`${styles.button} ${styles.buttonPadding}`}>
          <div className={styles.buttonIconContainer}>
            <Image src={ethLogo} alt="eth logo" height={20} width={20} />
          </div>
          <p>Ethereum</p>
          <div className={styles.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div className={`${styles.button} ${styles.buttonPadding}`}>
            <div className={styles.buttonTextContainer}>
              {shortenAddress(currentAccount)}
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${styles.button} ${styles.buttonPadding}`}
          >
            <div className={`${styles.buttonAccent} ${styles.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
        <div className={`${styles.button} ${styles.buttonPadding}`}>
          <div className={`${styles.buttonIconContainer} mx-2`}>
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
