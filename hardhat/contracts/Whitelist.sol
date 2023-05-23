//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist {
    // Max amount of whitelisted addys allowed
    uint8 public maxWhitelistedAddresses;

    // Active count of whitelisted addys
    uint8 public numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        // Check if wallet already whitelisted
        require(!whitelistedAddresses[msg.sender], "User already whitelisted");
        // Make sure whitelist isn't tapped
        require(
            numAddressesWhitelisted < maxWhitelistedAddresses,
            "Limit has been reached"
        );

        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted++;
    }
}
