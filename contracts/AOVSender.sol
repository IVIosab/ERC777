// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC777/IERC777Sender.sol";
import "@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol";


contract AOVSender is IERC777Sender, ERC1820Implementer{

    bytes32 constant public TOKENS_SENDER_INTERFACE_HASH = keccak256("ERC777TokensSender");

    event DoneStuff(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

    function senderFor(address account) public {
        _registerInterfaceForAddress(TOKENS_SENDER_INTERFACE_HASH, account);
    }

    function tokensToSend(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {

        // do stuff
        emit DoneStuff(operator, from, to, amount, userData, operatorData);
    }
}
