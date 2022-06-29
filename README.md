<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">AOV Token</h1>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#erc777-token">ERC77 Token</a></li>
        <li><a href="#send-hook">Send Hook</a></li>
        <li><a href="#recieve-hook">Recieve Hook</a></li>
        <li><a href="#etherless-transfer-operator">Etherless Transfer Operator</a></li>
        <li><a href="#bulksend-and-staticsale-operators">BulkSend and StaticSale Operators</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

An implementation of an ERC777 Token with:
* Send and Receive Hooks
* BulkSend, StaticSale, EtherlessTransfer Operators
* Full UI for BulkSend and StaticSale Operators

#### ERC777 Token

A token that follows the [ERC777 standard](https://eips.ethereum.org/EIPS/eip-777) Implemented in [AOV.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/AOV.sol) with the help of [Openzeppelin's ERC777 contract](https://docs.openzeppelin.com/contracts/4.x/api/token/erc777#ERC777) <br/>
The token has the name "Attack On Vapers" and symbol "AOV" <br/>
The token is initialized with a totalSupply of 10^10 tokens<br/>
<br/>

#### Send Hook

A simple send hook that is implemented in [AOVSender.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/AOVSender.sol) with the purpose of controling funds leaving one or more accounts by placing holder-defined rules around the transaction<br/> 
The hook is called after the transaction's information has been validated and authorized but before the contract's holdings have been updated<br/>
Its job is to emit an event upon sending a transaction.<br/>
<br/>

#### Recieve Hook

A simple recieve hook that is implemented in [AOVRecipient.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/AOVRecipient.sol) with the purpose of controling funds entering one or more accounts by placing holder-defined rules around the transaction<br/>
The hook is called after the contract's holdings have been updated<br/>
Its job is to emit an event upon recieving a transaction<br/>
<br/>

#### Etherless Transfer Operator

An operator that allows 0 ether transfer of tokens via a third party that has the signature authority Implemented in [EtherlessTransfer.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/EtherlessTransfer.sol)<br/>
The Signature Authority is obtained through getting a signed hash of the details of the transaction by the holder<br/>
It allows the third party to transfer tokens on behalf of the token holder where the third party is the one who pays for the transfer fees<br/>
<br/>

#### BulkSend Operator

An operator that allows sending tokens from a holder to multiple recipients Implemented in [BulkSend.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/BulkSend.sol<br/>
The BulkSend allowes the holder to send either a single amount to each of the recipients or a distinct amount of tokens for each recipient<br/>
<br/>
You can read more about BulkSend in its respective app [README](https://github.com/IVIosab/ERC777/blob/main/client/bulksender/README.md)<br/>
<br/>

#### StaticSale Operator

An operator that allows Selling and Buying tokens Implemented in [StaticPriceSeller.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/StaticPriceSeller.sol)<br/>
The StaticSale allowes holders to register as Seller by setting their PricePerToken<br/>
It also allowes anyone to buy tokens from a holder with their respective prices<br/>
<br/>
You can read more about StaticSale in its respective app [README](https://github.com/IVIosab/ERC777/blob/main/client/staticsale/README.md)<br/>
<br/>

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Truffle](https://trufflesuite.com/)
* [React.js](https://reactjs.org/)
* [Tailwindcss](https://tailwindcss.com/)
* [Vercel](https://vercel.com/)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started
You can test the project via the deployed web apps for BulkSend and StaticSale operators.

* Install the [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) browser extension.
* Connect to the Rinkeby Testnet.
* Get RinkebyETH through the [Rinkeby Faucet](https://rinkebyfaucet.com/)
* Go to the [StaticSale web app](https://static-sale.vercel.app/) to buy AOV tokens with RinkebyETH from the creator address


Now you are all set
You have both RinkebyETH and AOV tokens and can start testing the tokens via 
* [BulkSend App](https://bulk-sender.vercel.app/)
* [StaticSale App](https://static-sale.vercel.app/)

<!-- USAGE EXAMPLES -->
## Usage

For more examples, please refer to:
* [BulkSend App README](https://github.com/IVIosab/ERC777/blob/main/client/bulksender/README.md)
* [StaticSale App README](https://github.com/IVIosab/ERC777/blob/main/client/staticsale/README.md)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mosab Mohamed - [@IVIosab](https://t.me/IVIosab) - mosab.f.r@gmail.com

Project Link: [https://github.com/IVIosab/ERC777](https://github.com/IVIosab/ERC777)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Understanding ERC-20 token contracts](https://www.wealdtech.com/articles/understanding-erc20-token-contracts/)
* [Understanding ERC-777 token contracts](https://www.wealdtech.com/articles/understanding-erc777-token-contracts/)
* [Understanding ERC-777 token operator contracts](https://www.wealdtech.com/articles/understanding-erc777-token-operator-contracts/)
* [Openzeppelin](https://docs.openzeppelin.com/contracts/4.x/)
* [Ultimate Tailwind CSS Tutorial](https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship)
* [How to Write Better Git Commit Messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/)
* [Choose an Open Source License](https://choosealicense.com)
* [Best README Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)

<p align="right">(<a href="#top">back to top</a>)</p>
