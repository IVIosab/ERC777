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

  send = async () => {
    for(let i=0;i<this.state.addresses.length;i++){
      if(!this.web3.utils.isAddress(this.state.addresses[i])){
        alert(`bruh... "${this.state.addresses[i]}" is not an address`);
        return;
      }
    }
    if(this.state.value<0){
      alert(`You can't send negative tokens dude`)
      return;
    }
    this.setState({
      sendingStatus: true
    })
    const transaction = await this.bulk.methods.send(AOVAddress, this.state.addresses, this.state.value, "0x0123").send({from: this.state.user})
    .then( 
      (result) => {
        console.log(result);
        alert("Transaction Completed")
        this.setState({
          addresses: [""],
          value: 0,
          sendingStatus: false
        })
      }
    )
    .catch(
      (err) => {
        console.log(err);
        alert("Transaction Failed")
        this.setState({
          sendingStatus: false
        })
      }
    )
  }

  componentDidMount(){
    this.initialize();
  }

  componentDidUpdate(){
    this.update();
  }

  handleAmountChange(e){
    this.setState({
      value: e.target.value
    })
  }

  handleAccountsChange(i, e){
    let newAddresses = this.state.addresses;
    newAddresses[i] = e.target.value;
    this.setState({
      addresses: newAddresses
    });
  }

  addRow(){
    this.setState({
      addresses: ["", ...this.state.addresses]
    });
  }

  removeRow(i){
    let newAddresses = this.state.addresses;
    newAddresses.splice(i, 1);
    this.setState({ 
      addresses: newAddresses 
    });
  }

  render(){
    return (
      <div className='gradient-bg-welcome'>
      </div>
    )  
  }
}
export default App;