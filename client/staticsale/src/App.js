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
      userPrice: 0,
      creator: "0xdf7fac27cf88438d5dde19169c7035dd2172d454",
      creatorStock: 0,
      creatorPrice: 0,
      creatorValue: 0,
      seller: "",
      sellerStock: 0,
      sellerPrice: 0,
      sellerValue: 0,
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
    const newCreatorStock = await this.token.methods.balanceOf(this.state.creator).call({from: this.state.user});
    const newCreatorPrice = await this.static.methods.getPricePerToken(AOVAddress, this.state.creator).call({from: this.state.user});
    this.setState({
      creatorStock: newCreatorStock,
      creatorPrice: newCreatorPrice,
      balance: userBalance
    })
  }

  check = async () => {
    if(this.web3.utils.isAddress(this.state.seller)){
      const newSellerStock = await this.token.methods.balanceOf(this.state.seller).call({from: this.state.user});
      const newSellerPrice = await this.static.methods.getPricePerToken(AOVAddress, this.state.seller).call({from: this.state.user});
      this.setState({
        sellerStock: newSellerStock,
        sellerPrice: newSellerPrice
      })
    }
    else{
      alert(`"${this.state.seller}" is not an Address`)
    }
  }

  buySeller = async () => {
    if(this.state.sellerPrice==="0"){
      alert(`Not For Sale`);
      return;
    }
    if(this.state.sellerValue<0){
      alert(`You can't purchase a negative amount of tokens`)
      return;
    }
    this.setState({
      sendingStatus: true
    })
    const transaction = await this.static.methods.send(AOVAddress, this.state.seller).send({from: this.state.user, value: this.state.sellerValue*this.state.sellerPrice})
    .then( 
      (result) => {
        console.log(result);
        alert("Transaction Completed")
        this.setState({
          seller: "",
          sellerPrice: 0,
          sellerStock: 0,
          sellerValue: 0,
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
    console.log(transaction);
  }

  buyCreator = async () => {
    if(this.state.creatorValue<0){
      alert(`You can't purchase a negative amount of tokens`)
      return;
    }
    this.setState({
      sendingStatus: true
    })
    const transaction = await this.static.methods.send(AOVAddress, this.state.creator).send({from: this.state.user, value: this.state.creatorValue*this.state.creatorPrice})
    .then( 
      (result) => {
        console.log(result);
        alert("Transaction Completed")
        this.setState({
          creatorValue: 0,
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
    console.log(transaction);
  }

  setUser = async () => {
    if(this.state.userPrice<0){
      alert(`You can't set a negative price`)
      return;
    }
    this.setState({
      sendingStatus: true
    })
    const transaction = await this.static.methods.setPricePerToken(AOVAddress, this.state.userPrice).send({from: this.state.user})
    .then( 
      (result) => {
        console.log(result);
        alert("Transaction Completed")
        this.setState({
          userPrice: 0,
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
    console.log(transaction);
  }

  componentDidMount(){
    this.initialize();
  }

  componentDidUpdate(){
    this.update();
  }

  handleCreatorAmountChange(e){
    this.setState({
      creatorValue: e.target.value
    })
  }
  
  handleSellerAddressChange(e){
    this.setState({
      seller: e.target.value,
      sellerPrice: 0,
      sellerStock: 0
    })
  }

  handleSellerAmountChange(e){
    this.setState({
      sellerValue: e.target.value,
    })
  }

  handleUserAmountChange(e){
    this.setState({
      userPrice: e.target.value,
    })
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
            <label className='text-white text-2xl'>Static Seller</label>
          </div>
          <div className='flex flex-col w-1/3 justify-center items-center'>
            <label className='text-white'>{status}</label>
            <label className='text-white'>Current Account: {this.state.user.slice(0,6)}...{this.state.user.slice(this.state.user.length-4)}</label>
            <label className='text-white'>My Balance: {this.state.balance}</label>
          </div>
        </div>
        <div className='min-h-screen gradient-bg-services pt-40'>
          <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-col gradient-bg-card justify-center items-center rounded-3xl border border-gray-800 hover:shadow-lg w-72 h-64 m-5'>
              <label className='text-white pb-2 text-2xl'>Creator</label> 
              <div className=' flex flex-col justify-start items-start'>
                <label className='text-white p-1'>Seller: {this.state.creator.slice(0,6)}...{this.state.creator.slice(this.state.creator.length-4)}</label>
                <label className='text-white p-1'>Price: {this.state.creatorPrice} WEI</label>
                <label className='text-white p-1'>Stock: {this.state.creatorStock} AOV</label>
              </div>
              <Input
                handleChange={(e)=>this.handleCreatorAmountChange(e)}
                type="number"
                name="amount"
                value={this.state.creatorValue}
              />
              {
                this.state.sendingStatus
                ?
                <label className='text-white'>Loading Transaction...</label>
                :
                <Button 
                  onClick={()=>this.buyCreator()}
                  name="Buy"
                />
              }
            </div>
          </div>
          <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-col gradient-bg-card justify-center items-center rounded-3xl border border-gray-800 hover:shadow-lg w-96 h-64 m-5'>
              <label className='text-white pb-2 text-2xl'>Sellers</label> 
              <div className='flex flex-col justify-start items-start'>
                <div className='flex flex-row'>
                  <label className='text-white p-1'>Seller:</label>
                  <Input 
                    handleChange={(e)=>this.handleSellerAddressChange(e)}
                    type="text"
                    name="account"
                    value={this.state.seller}
                  />
                  {
                    this.state.sendingStatus
                    ?
                    null
                    :
                    <Button 
                      onClick={()=>this.check()}
                      name="Check"
                    />
                  }
                </div>
                <label className='text-white p-1'>Price: {this.state.sellerPrice!=="0" ? this.state.sellerPrice+" WEI" : "Not For Sale"}</label>
                <label className='text-white p-1'>Stock: {this.state.sellerStock} AOV</label>
              </div>
              <Input
                handleChange={(e)=>this.handleSellerAmountChange(e)}
                type="number"
                name="amount"
                value={this.state.sellerValue}
              />
              {
                this.state.sendingStatus
                ?
                <label className='text-white'>Loading Transaction...</label>
                :
                <Button 
                  onClick={()=>this.buySeller()}
                  name="Buy"
                />
              }
            </div>
            <div className='flex flex-col gradient-bg-card justify-center items-center rounded-3xl border border-gray-800 hover:shadow-lg w-96 h-64 m-5'>
              <label className='text-white pb-4 text-2xl'>Set Price</label> 
              <div className=' flex flex-col justify-start items-start'>
                <label className='text-white p-1'>Seller: {this.state.user.slice(0,6)}...{this.state.user.slice(this.state.user.length-4)}</label>
                <div className='flex flex-row'>
                  <label className='text-white p-1'>Price:</label>
                  <Input
                    handleChange={(e)=>this.handleUserAmountChange(e)}
                    type="number"
                    name="amount"
                    value={this.state.userPrice}
                  />
                  <label className='text-white p-1'>WEI</label>
                </div>
                <label className='text-white p-1'>Stock: {this.state.balance} AOV</label>
              </div>
              {
                this.state.sendingStatus
                ?
                <label className='text-white'>Loading Transaction...</label>
                :
                <Button 
                  onClick={()=>this.setUser()}
                  name="Set"
                />
              }
            </div>
          </div>
        </div>
      </div>
    )  
  }
}

export default App;