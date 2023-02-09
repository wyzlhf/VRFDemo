const {getNamedAccounts,deployments} = require('hardhat');
const baseFee ="10000000000000000"
const gasPriceLink ="1000000000"

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('VRFCoordinatorV2Mock', {
        from: deployer,
        args: [
            baseFee,
            gasPriceLink
        ],   //constructor中的参数
        log: true,
    });
};
module.exports.tags=["mock"]