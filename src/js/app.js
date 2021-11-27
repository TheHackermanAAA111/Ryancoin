
App = {
    web3Provider: null,
    account: '0x0',
    contracts: {},
    tokenSold: 0,
    tokensAvailable: 75000,
    tokenPrice: 1000000000000000,

    init: function(){
        console.log("App initialized...")
        return App.initWeb3();
    },

    initWeb3: function(){
        if(typeof web3 != 'undefined'){
            // if web3 instance already exists from Meta Mask
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        }else{
            // specify the default instance if no web3 is provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContracts();
    },

    initContracts: function(){
        //getJSON function
        $.getJSON("DappTokenSale.json", function(dappTokenSale) {
            App.contracts.DappTokenSale = TruffleContract(dappTokenSale);
            App.contracts.DappTokenSale.setProvider(App.web3Provider);
            App.contracts.DappTokenSale.deployed().then(function(dappTokenSale){
                console.log("Ryancoin Token Sale Address:", dappTokenSale.address);
        });
        }).done(function(){
            $.getJSON("DappToken.json", function(dappToken) {
                App.contracts.DappToken = TruffleContract(dappToken);
                App.contracts.DappToken.setProvider(App.web3Provider);
                App.contracts.DappToken.deployed().then(function(dappToken){
                    console.log("Ryancoin Token Address:", dappToken.address);
                });

                App.listenForEvents();
                return App.render();
            });
        })
    },


    // listenForEvents
    // render

}

// load token sale contract


