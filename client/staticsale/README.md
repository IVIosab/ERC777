<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">AOV Token Static Seller</h1>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#staticsale-operator">StaticSale Operator</a></li>
        <li><a href="#staticsale-app">StaticSale App</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#user-information-box">User Information Box</a></li>
        <li><a href="#creator-card">Creator Card</a></li>
        <li><a href="#sellers-card">Sellers Card</a></li>
        <li><a href="#set-price-card">Set Price Card</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A web app for the StaticSale Operator that allows token holders to register as sellers by setting their PricePerToken and allows people to buy tokens with ether from sellers 

#### StaticSale Operator

An operator that allows Selling and Buying tokens Implemented in [StaticPriceSeller.sol](https://github.com/IVIosab/ERC777/blob/main/contracts/StaticPriceSeller.sol)<br>
The StaticSale allows token holders to register as Seller by setting their PricePerToken<br>
And it also allows anyone to buy tokens from a seller by paying ether to the sellers<br>
This operator can be used by any ERC777 compatible token<br>
<br>

<p align="right">(<a href="#top">back to top</a>)</p>

#### StaticSale App

<div align="center">
  <img src="images/staticsale.png" alt="WebApp" width="744" height="500">
</div>
<br>
<br>
The web app allows the users to Buy from either the Creator or other addresses that have put their tokens up for sale<br>
It also allows uses to put their tokens up for sale by Setting their PricePerToken<br>

<!-- GETTING STARTED -->
## Getting Started
You can test the project via the deployed web apps for BulkSend and StaticSale operators.

* Install the [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) browser extension.
* Connect to the Rinkeby Testnet.
* Get RinkebyETH through the [Rinkeby Faucet](https://rinkebyfaucet.com/)
* Go to the [StaticSale web app](https://static-sale.vercel.app/) to buy AOV tokens with RinkebyETH from the creator address


Now you are all set
You have both RinkebyETH and AOV tokens and can start testing the tokens via 
* [StaticSale App](https://static-sale.vercel.app/)

<!-- USAGE EXAMPLES -->
## Usage

The web app is composed of Four major elements:
* User Information Box
* Creator Card 
* Sellers Card
* Set Price Card

#### User Information Box
<div align="center">
  <img src="images/information.png" alt="WebApp" width="575" height="200">
</div>
<br>
<br>
In the top right corner of the app there is 3 lines that describe basic information about the user: <br>
1. Connection to the app with MetaMask<br>
2. Current connected account<br>
3. account's AOV balance<br>

#### Creator Card
<div align="center">
  <img src="images/creator.png" alt="WebApp" width="336" height="300">
</div>
<br>
<br>
In the top center of the app there is the Creator Seller Card<br>
It consists of 3 parts:<br>
1. Creator Seller Information:<br>
Which includes the address of the creator, the PricePerToken and the remaining stock of the Creator<br>
2. Amount Input:<br>
Where the user inserts the amount of tokens they want to buy<br>
3. Buy Button:<br>
Which upon getting clicked initiates the buying process<br>

#### Sellers Card
<div align="center">
  <img src="images/sellers.png" alt="WebApp" width="452" height="300">
</div>
<br>
<br>
In the left center of the app there is the Sellers Card<br>
It consists of 4 parts:<br>
1. Seller Address Input:<br>
Where the user inserts the address of the account they want to buy from. And after that they click the Check button which will update the Seller Information<br>
2. Seller Information:<br>
Which includes the PricePerToken and the remaining stock of the Seller<br>
Note: if the PricePerToken is set to 0 then that means the tokens are not for sale and the UI will show "Not For Sale"<br>
3. Amount Input:<br>
Where the user inserts the amount of tokens they want to buy<br>
4. Buy Button:<br>
Which upon getting clicked initiates the buying process<br>

#### Set Price Card
<div align="center">
  <img src="images/price.png" alt="WebApp" width="454" height="300">
</div>
<br>
<br>
In the right center of the app there is the Set Price Card<br>
It consists of 3 parts:<br>
1. User's Information:<br>
Which includes the User's address and remaining stock<br>
2. Price Input:<br>
Where the user can insert the PricePerToken they want to set<br>
3. Set Button:<br>
Which upon getting clicked initiates the setting process<br>

<p align="right">(<a href="#top">back to top</a>)</p>
