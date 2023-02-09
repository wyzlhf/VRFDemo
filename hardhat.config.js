/** @type import('hardhat/config').HardhatUserConfig */
require('hardhat-deploy')
require("@nomiclabs/hardhat-ethers")
module.exports = {
    solidity: "0.8.17",
    namedAccounts: {
        deployer:{
            default:0
        }
    }
};
