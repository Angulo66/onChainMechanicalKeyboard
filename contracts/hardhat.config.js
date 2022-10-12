require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',
  networks: {
    // rinkeby: {
    //   url: process.env.NODE_API_URL,
    //   accounts: [process.env.RINKEBY_PRIVATE_KEY]
    // },
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/zjbTUg1cryscWQnHcvHKvU30v2U7bPQf',
        blockNumber: 15726820
      },
      chainId: 31_336
    }
  }
}
// module.exports = {
//   solidity: "0.8.17",
// };
