
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


    // listenForEvents - those emitted by contracts
    listenForEvents: function(){
        App.contracts.DappTokenSale.deployed().then(function(instance) {
            instance.Sell({}, {
                fromBlock: 0,
                toBlock, 'latest',
            }).watch(function(error, event) {
                console.log("event triggered", event);
                App.render();
            })
        })
    },

    // render
    render: function(){
        if(App.loading){
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content = $('#content');

        loader.show();
        content.hide();

        // load account data
        web3.eth.getCoinbase(function(err, account){
            if(err == null){
                App.account = account;
                $('#accountAdress').html("Your Account: " + account);
            }
        })

        // load the token sale contract
        App.contracts.DappTokenSale.deployed().then(function(instance) {
            ryanCoinInstance = instance;
            return ryanCoinInstance.tokenPrice();
        }).then(function(tokenPrice) {
            App.tokenPrice = tokenPrice;
            $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
            return ryanCoinInstance.tokensSold();
        }).then(function(tokensSold) {
            App.tokensSold = tokensSold.toNumber();
            $('.token-sold').html(App.tokensSold);
            $('.tokens-available').html(App.tokensAvailable);

            var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
            $('#progress').css('width', progressPercent + '%')

            //load token contract
            App.contracts.DappToken.deployed().then(function(instance) {
                ryanCoinInstance = instance;
                return ryanCoinInstance.balanceOf(App.account);
            }).then(function(balance){
                $('.ryan-balance').html(balance.toNumber());
                App.loading = false;
                loader.hide();
                content.show();
            })
        });
    },

    buyTokens: function() {
        $('#content').hide();
        $('#loader').show();
        var numberOfTokens = $('#numberOfTokens').val();
        App.contracts.DappTokenSale.deployed().then(function(instance){
            return instance.buyTokens(numberOfTokens, {
                from: App.account,
                value: numberOfTokens * App.tokenPrice,
                gas: 500000 // Gas limit
            });
        }).then(function(result){
            console.log("Tokens bought ...")
            $('from').trigger('reset') // reset number of tokens in form
            // Wait to Sell event
        });
    }
}

$(function() {
    $(window).load(function() {
        App.init();
    })
});
