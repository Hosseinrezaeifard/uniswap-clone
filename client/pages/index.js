import Header from "../components/Header";
import Main from "../components/Main";
import TransactionHistory from "../components/TransactionHistory";

const styles = {
  wrapper:
    "h-screen max-h-screen min-h-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between",
};

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Main />
      <TransactionHistory />
    </div>
  );
}
