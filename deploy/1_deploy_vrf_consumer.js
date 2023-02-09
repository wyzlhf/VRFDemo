const {getNamedAccounts,deployments} = require('hardhat');

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    let vrfCoordinatorAddr
    let subId

    vrfCoordinator=await ethers.getContract("VRFCoordinatorV2Mock")
    vrfCoordinatorAddr=vrfCoordinator.address

    const tx=await vrfCoordinator.createSubscription()
    const txReceipt=await tx.wait(1)
    subId=ethers.BigNumber.from(txReceipt.events[0].topics[1])

    await vrfCoordinator.fundSubscription(subId,"100000000000000000000")

    await deploy('ChainlinkVRFDemo', {
        from: deployer,
        args: [
            vrfCoordinatorAddr,
            subId
        ],   //constructor中的参数
        log: true,
    });
};
module.exports.tags=["vrf"]