App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */
	// Modern dapp browsers...
	if (window.ethereum) {
	  App.web3Provider = window.ethereum;
	  try {
	    // Request account access
	    await window.ethereum.request({ method: "eth_requestAccounts" });;
	  } catch (error) {
	    // User denied account access...
	    console.error("User denied account access")
	  }
	}
	// Legacy dapp browsers...
	else if (window.web3) {
	  App.web3Provider = window.web3.currentProvider;
	}
	// If no injected web3 instance is detected, fall back to Ganache
	else {
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */
	$.getJSON('SafeMov.json', function(data) {
	  // Get the necessary contract artifact file and instantiate it with @truffle/contract
	  var SafeMovArtifact = data;
	  App.contracts.SafeMov = TruffleContract(SafeMovArtifact);

	  // Set the provider for our contract
	  App.contracts.SafeMov.setProvider(App.web3Provider);

	  // Use our contract to show all past trips
	  return App.getPastTrips();
	});

    return App.bindEvents();
  },

  //Assign functions to buttons
  bindEvents: function() {
    $(document).on('click', '.btn-initTrip', App.initTrip);
  },

  getPastTrips: function() {
    /*
     * Replace me...
     */
     var safemovInstance;
     web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
	    console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.SafeMov.deployed().then(function(instance) {
	    safemovInstance = instance;

	    // Execute adopt as a transaction by sending account
	    return safemovInstance.getPastEvents('InitT', {filter: {_idPassenger:accounts[0]}});
	  }).then(function(result) {
	    //Load result on textarea 
	    return 0;
	  }).catch(function(err) {
	    console.log(err.message);
	  });
	});

  },

  initTrip: function(event) {
    event.preventDefault();

    //var petId = parseInt($(event.target).data('id'));
    //var driversAddress = ;
    //var vehicleAddress = ;
    //var origin = ;
    //var destination = ;
    //var cost = ;

    /*
     * Replace me...
     */
     var safeMovInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
	    console.log(error);
	  }

	  App.contracts.SafeMov.deployed().then(function(instance) {
	    safeMovInstance = instance;

	    // Execute adopt as a transaction by sending account
	    return safeMovInstance.initTrip(accounts[1],accounts[2],10,'hora actual','ITAM Rio Hondo','ITAM Santa Teresa', {value:web3.utils.toWei("10","ether"),from: accounts[0]});
	  }).then(function(result) {
	    console.log(result);
	    return App.getPastTrips();
	  }).catch(function(err) {
	    console.log(err.message);
	  });
	});

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
