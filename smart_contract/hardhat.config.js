require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "Your HTTP Api key from your node provider (_example: Alchemy)"
      accounts: [
        "Your Metamask private key",
      ],
    },
  },
};
