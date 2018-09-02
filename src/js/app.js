App = {
  web3Provider: null,
  contracts: {},
  contractInstance: null,
  msg: $('.msg'),




  init: function () {

    return App.initWeb3();
  },



  initWeb3: function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },




  initContract: function () {
    $.getJSON('Mandate.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var MandateArtifact = data;
      App.contracts.Mandate = TruffleContract(MandateArtifact);

      // Set the provider for our contract
      App.contracts.Mandate.setProvider(App.web3Provider);

      App.createContractInstance();
      return App.bindEvents();

    });
  },



  createContractInstance() {
    App.contracts.Mandate.deployed()
      .then(function (instance) {
        App.contractInstance = instance;
      });

  },




  bindEvents: function () {
    $('.setBankAccount').click(App.setBankAccount);
    $('.getBankAccount').click(App.getBankAccount);
    $('.getInstallments').click(App.getInstallments);
  
  },




  // approve someone to deal with one of your lands;
  setBankAccount: function () {
    const key = $('#approve-key').val();
    //const id = $('#approve-id').val();

    App.contractInstance.setBankAccount(key).then(() => {
      App.setMessage();
      App.msg.text('Bank Account Identified');
    });
  },






  // approve someone to deal with all of your lands;
 getBankAccount: function () {
    const key = $('#approve-all-key').val();
   
      App.contractInstance.getBankAccount(key).then((amount) => {
      App.setMessage();
      App.msg.text(amount.toNumber());
    });
  },



  // check who has the permession for one land
  getInstallments: function () {
    const price = $('#exist-id').val();
    const number = $('#number-id').val();
    App.contractInstance.getInstallments(price,number).then((amount) => {
      App.setMessage();
      App.msg.text(amount.toNumber());


  },



  setMessage: function () {
    App.msg.show();
    setTimeout(() => {
      App.msg.hide();
    }, 3000);
  },

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});