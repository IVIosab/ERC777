import './App.css';
import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import {AOVabi, AOVAddress, StaticPriceSellerabi, StaticPriceSellerAddress} from './utils/constants';
import {Button} from './components/Button'
import {Input} from './components/Input'


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: "",
      balance: 0,
      seller: "0xdf7fac27cf88438d5dde19169c7035dd2172d454",
      stock: 0,
      price: 0,
      value: 0,
      sendingStatus: false
    };
  }

  initialize = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        this.web3 = new Web3(provider);
        this.token = new this.web3.eth.Contract(AOVabi,AOVAddress);
        this.static = new this.web3.eth.Contract(StaticPriceSellerabi,StaticPriceSellerAddress);
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        this.setState({user: accounts[0]});
      } else {
        alert('Please install MetaMask!');
      }
  }

  update = async () => {
    const userBalance = await this.token.methods.balanceOf(this.state.user).call({from: this.state.user});
    const newStock = await this.token.methods.balanceOf(this.state.seller).call({from: this.state.user});
    const newPrice = await this.static.methods.getPricePerToken(AOVAddress, this.state.seller).call({from: this.state.user});
    this.setState({
      stock: newStock,
      price: newPrice,
      balance: userBalance
    })
  }

  componentDidMount(){
    this.initialize();
  }

  componentDidUpdate(){
    this.update();
  }

  render(){
    let status;
    if(this.state.user){
      status = "Connected!";
    }
    else{
      status = "Connect with MetaMask";
    }
    return (
      <div className='gradient-bg-welcome'>
        <div className='gradient-bg-welcome flex'>
          <div className='flex flex-col w-1/3 justify-center items-center'>
            <label className='text-white text-2xl'>AOV</label>
          </div>
          <div className='flex flex-col w-1/3 justify-center items-center'>
            <label className='text-white text-2xl'>Bulk Sender</label>
          </div>
          <div className='flex flex-col w-1/3 justify-center items-center'>
            <label className='text-white'>{status}</label>
            <label className='text-white'>Current Account: {this.state.user.slice(0,6)}...{this.state.user.slice(this.state.user.length-4)}</label>
            <label className='text-white'>My Balance: {this.state.balance}</label>
          </div>
        </div>
      </div>
    )  
  }
}

export default App;