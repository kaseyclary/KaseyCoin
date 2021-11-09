import React, { Component } from "react";
import KaseyCoinContract from "./contracts/KaseyCoin.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { 
    storageValue: 0,
    ownerBalance: 0, 
    web3: null, 
    accounts: null, 
    contract: null, 
    user: {
      address: null,
      username: null,
      balance: null,
    }
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = KaseyCoinContract.networks[networkId];
      const instance = new web3.eth.Contract(
        KaseyCoinContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      // this.setState(this.getOwnerBalance);
      // this.setState(this.getUserDetails());
      this.setState({ web3, accounts, contract: instance }, this.initialize)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  initialize = async () => {
    this.getOwnerBalance();
    this.getUserDetails();
    this.checkUserName();
  }

  getOwnerBalance = async () => {
    const { accounts, contract } = this.state;
    const balance = await contract.methods.balanceOf(accounts[0]).call();
    this.setState({ownerBalance: balance});
    console.log(this.state.ownerBalance);
  };

  getUserDetails = async () => {
    const { contract } = this.state;
    const userAddress = await contract.methods.getUserAddress().call();
    this.setState({user: {address: userAddress}});
  }

  checkUserName = async () => {
    const { contract } = this.state;
    const returnedUsername = await contract.methods.getUserName().call();
    if(returnedUsername == null){
      this.setUserName();
    } else {
      this.setState({user: {username: returnedUsername}});
    }
  }

  setUserName = async () => {
    const { contract } = this.state;
    const _username = await contract.methods.setUserName("Test");
    this.setState({user: {username: _username}});
    console.log("ran");
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Welcome to KaseyCoin</h1>
        <h2>There are only 20,000 Kasey Coins minted and in circulation</h2>
        <p>There are currently {this.state.ownerBalance} left to purchase direct from the mint</p>
        <h3> Your address is {this.state.user.address} </h3>
        <h3> Your username is {this.state.user.username} </h3>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: </div>
      </div>
    );
  }
}

export default App;
