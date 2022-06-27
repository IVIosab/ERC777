import './App.css';
import React from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import {AOVabi, AOVAddress, BulkSendabi, BulkSendAddress} from './utils/constants';
import {Button} from './components/Button'
import {Input} from './components/Input'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: "",
      balance: 0,
      addresses: [""],
      value: 0,
      sendingStatus: false
    };
  }

  initialize = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        this.web3 = new Web3(provider);
        this.token = new this.web3.eth.Contract(AOVabi,AOVAddress);
        this.bulk = new this.web3.eth.Contract(BulkSendabi,BulkSendAddress);
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        this.setState({user: accounts[0]});
      } else {
        alert('Please install MetaMask!');
      }
  }

  update = async () => {
    const userBalance = await this.token.methods.balanceOf(this.state.user).call({from: this.state.user});
    this.setState({
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
    return (
      <div className='gradient-bg-welcome'>
      </div>
    )  
  }
}
export default App;