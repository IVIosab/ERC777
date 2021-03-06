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
    let recipients = [];
    for(let i=1;i<this.state.addresses.length;i++){
      recipients.push(this.state.addresses[i]);
    }
    if(recipients.length===0){
      alert(`You can't send to no one`);
      return;
    }
    if(this.state.value<0){
      alert(`You can't send a negative amount of tokens`)
      return;
    }
    if(this.state.value*recipients.length>this.state.balance){
      alert(`You can't send more tokens than you have`);
      return;
    }
    this.setState({
      sendingStatus: true
    })
    await this.bulk.methods.send(AOVAddress, recipients, this.state.value, "0x0123").send({from: this.state.user})
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

  addRow(i){
    if(!this.web3.utils.isAddress(this.state.addresses[i])){
      alert(`"${this.state.addresses[i]}" is not an address`);
      return;
    }
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

  renderInput(i){
    let buttonName = "";
    let buttonColor = "";
    let buttonOnClick = null;
    if(i){
      buttonName = "x";
      buttonColor = "red";
      buttonOnClick = ()=>this.removeRow(i)
    }
    else{
      buttonName = "+";
      buttonColor = "blue";
      buttonOnClick = ()=>this.addRow(i)
    }
    return(
      <div>
        <Input 
          handleChange={(e)=>this.handleAccountsChange(i,e)}
          type="text"
          name="account"
          value= {(this.state.addresses[i])}
        />
        {
          this.state.sendingStatus 
          ? 
          null
          :
          <Button
            onClick={buttonOnClick}
            name={buttonName}
            color={buttonColor}
          />
        }
      </div>
    )
  } 

  render(){
    let rows = [];
    for(let i=0;i<this.state.addresses.length;i++){
      rows.push(this.renderInput(i));
    }
    let formattedRows = (<div>{rows}</div>)
    let status;
    if(this.state.user){
      status = "Connected!";
    }
    else{
      status = "Connect with MetaMask";
    }
    return (
      <div className='flex flex-col'>
        <div className='gradient-bg-welcome flex'>
          <div className='flex flex-col w-1/3 items-center'>
            <label className='text-white text-2xl'>AOV</label>
          </div>
          <div className='flex flex-col w-1/3 items-center'>
            <label className='text-white text-2xl'>Bulk Sender</label>
          </div>
          <div className='flex flex-col w-1/3 items-center'>
            <label className='text-white'>{status}</label>
            <label className='text-white'>Current Account: {this.state.user.slice(0,6)}...{this.state.user.slice(this.state.user.length-4)}</label>
            <label className='text-white'>My Balance: {this.state.balance}</label>
          </div>
        </div>
        <div className='min-h-screen gradient-bg-services pt-80'>
          <div className='flex flex-col justify-center items-center'>
            <label className='text-white'>Accounts</label>
            {formattedRows}
            <label className='text-white'>Amount</label>
            <Input
              handleChange={(e)=>this.handleAmountChange(e)}
              type="number"
              name="amount"
              value={this.state.value}
            />
            {
              this.state.sendingStatus 
              ?
              <label className='text-white'>Loading Transaction...</label>
              :
              <Button 
                onClick={()=>this.send()}
                name="Send"
                color="blue"
              />
            }
          </div>
        </div>
      </div>
    )  
  }
}
export default App;