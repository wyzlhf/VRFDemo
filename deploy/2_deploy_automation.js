const {getNamedAccounts,deployments} = require('hardhat');

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('AutomationDemo', {
        from: deployer,
        args: [],   //constructor中的参数
        log: true,
    });
};
module.exports.tags=["automation"]