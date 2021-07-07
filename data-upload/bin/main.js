import Parcel from '@oasislabs/parcel';
import * as fs from 'fs';
// #region snippet-connect
const parcel = new Parcel({
    clientId: "CVBKpDsVauJYRWBuuAvc7M7",
    privateKey: { "alg": "ES256", "use": "sig", "kty": "EC", "crv": "P-256", "x": "rfehJo8tmk8o1UF884LOx_sTtOvyj8q5UjCAec_RqkA", "y": "-JIXYwnsUEKUWiikMx5k0VGMqD4kunHcDWg9OGa88os", "d": "j2Y2mI8slwGCk0NQr_KywnI7xo_ZYVtqr2GmUO7laro" },
});
// #endregion snippet-connect
// #region snippet-document-upload
const data = '{ "accounts": [ { "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "balances": { "available": 110, "current": 110, "iso_currency_code": "USD", "limit": null, "unofficial_currency_code": null }, "mask": "0000", "name": "Plaid Checking", "official_name": "Plaid Gold Standard 0% Interest Checking", "subtype": "checking", "type": "depository" } ], "transactions": [ { "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 2307.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Shops", "Computers and Electronics" ], "category_id": "19013000", "date": "2017-01-29", "datetime": null, "authorized_date": "2017-01-27", "authorized_datetime": null, "location": { "address": "300 Post St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.740352, "lon": -74.001761, "store_number": "1235" }, "name": "Apple Store", "merchant_name": "Apple", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" }, { "account_id": "aWaSaj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 1.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Shops", "Grocery" ], "category_id": "190130120", "date": "2017-01-30", "datetime": null, "authorized_date": "2017-01-30", "authorized_datetime": null, "location": { "address": "1 First St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.20352, "lon": -74.11761, "store_number": "1235" }, "name": "Safeway", "merchant_name": "Safeway", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "asdw3nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" }, { "account_id": "bawedSaj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 1200.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Institution", "Financial" ], "category_id": "190130120", "date": "2017-01-30", "datetime": null, "authorized_date": "2017-01-30", "authorized_datetime": null, "location": { "address": "112 First St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.20352, "lon": -74.11761, "store_number": "1235" }, "name": "Coinbase", "merchant_name": "Coinbase", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "asdw3nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" } ], "item": { "available_products": [ "balance", "identity", "investments" ], "billed_products": [ "assets", "auth", "liabilities", "transactions" ], "consent_expiration_time": null, "error": null, "institution_id": "ins_3", "item_id": "eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6", "update_type": "background", "webhook": "https://www.genericwebhookurl.com/webhook" }, "total_transactions": 1, "request_id": "45QSn"}';
const documentDetails = { title: '2021-5 Checking Account Statement Wells Fargo Bank Acct 23231220', tags: ['greeting', 'english'] };
let document;
try {
    document = await parcel.uploadDocument(data, {
        details: documentDetails,
        toApp: "A67Pp9Xu7MnEQ5dus5LEy31",
    }).finished;
}
catch (error) {
    console.error('Failed to upload document');
    throw error;
}
console.log(`Created document ${document.id} with title ${document.details.title}`);
// #endregion snippet-document-upload
// #region snippet-document-search
// const uploadedDocuments = (
//   await parcel.searchDocuments({
//     selectedByCondition: { 'document.creator': { $eq: (await parcel.getCurrentIdentity()).id } },
//   })
// ).results;
// for (const d of uploadedDocuments) {
//   console.log(`Found document ${d.id} named ${d.details.title}`);
// }
// #endregion snippet-document-search
// #region snippet-document-download
// Let's download the above document using its ID.
// By default, the document owner can download the data.
const download = parcel.downloadDocument(document.id);
const saver = fs.createWriteStream(`./user_data`);
try {
    await download.pipeTo(saver);
    console.log(`Document ${document.id} has been downloaded to ./user_data`);
}
catch (error) {
    console.error(`Failed to download document ${document.id}`);
    throw error;
}
const output = fs.readFileSync('./user_data', 'utf-8');
console.log(`Hey document owner! Here's your data: ${output}\n`);
// #endregion snippet-document-download
