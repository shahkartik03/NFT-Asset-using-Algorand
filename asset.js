// Algorand Algod (v2) example 
// Send transaction on TestNet

const algosdk = require('algosdk');
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";

const token = {
    'X-API-key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
}

let algodClient = new algosdk.Algodv2(token, baseServer, port);

(async () => {

    let params = await algodClient.getTransactionParams().do();

    let amount = Math.floor(Math.random() * 1000);
    // Super reach algo address' mnemonic
    var mnemonic = "code thrive mouse code badge example pride stereo sell viable adjust planet text close erupt embrace nature upon february weekend humble surprise shrug absorb faint";
    var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
    var recoveredAccount2 = 'U2VHSZL3LNGATL3IBCXFCPBTYSXYZBW2J4OGMPLTA4NA2CB4PR7AW7C77E';

    console.log('recoveredAccount.addr   ', recoveredAccount.addr);

    //

    let note = undefined; 
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1000;
    let unitName = "LATINUM";
    let assetName = "latinum";
    let assetURL = "https://asllinea.org/wp-content/uploads/2014/03/BookPileXXXIV-copy.jpg";
    let assetMetadataHash = "16efaa3924a6fd9d3a4824799a4ac65d";
    let manager = recoveredAccount2.addr;
    let reserve = recoveredAccount2.addr;
    let freeze = recoveredAccount2.addr;
    let clawback = recoveredAccount2.addr;

    //

    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
        recoveredAccount.addr, 
        note,
        totalIssuance, 
        decimals, 
        defaultFrozen, 
        manager, 
        reserve, 
        freeze,
        clawback, 
        unitName, 
        assetName, 
        assetURL, 
        assetMetadataHash, 
        params);

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction : " + sendTx.txId);
})().catch(e => {
    console.log(e);
}); 