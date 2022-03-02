require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/yVlMdOGaTiqvkXXeK3FUlvdhkZMup1vy",
      accounts: [
        "205b0270263fe97f08e6eb1f8b520324db151de444d65f5318f946b4ac39bf5b",
      ],
    },
  },
};
