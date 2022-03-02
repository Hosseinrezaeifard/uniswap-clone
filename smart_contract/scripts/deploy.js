const main = async () => {
  // get it (compile)
  const transactionFactory = await hre.ethers.getContractFactory("Transaction");
  // deploy it
  const transactionContract = await transactionFactory.deploy();

  // wait till you get a response
  await transactionContract.deployed();

  // log the result on the console
  console.log(
    "Transaction deployed successfully to ==> ",
    transactionContract.address
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
