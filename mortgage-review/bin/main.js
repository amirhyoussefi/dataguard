import Parcel, { JobPhase } from '@oasislabs/parcel';
import fs from 'fs';
// --- Upload data as Bob.
// In a real-world scenario, these credentials would typically be used in a completely separate script
// because no single entity has access to both Acme and Bob credentials.
// This example script, however, performs actions both as Acme and Bob so that the flow is easier to
// follow.
// #region snippet-input-documents
const parcelBob = new Parcel({
    clientId: "CVBKpDsVauJYRWBuuAvc7M7",
    privateKey: { "alg": "ES256", "use": "sig", "kty": "EC", "crv": "P-256", "x": "rfehJo8tmk8o1UF884LOx_sTtOvyj8q5UjCAec_RqkA", "y": "-JIXYwnsUEKUWiikMx5k0VGMqD4kunHcDWg9OGa88os", "d": "j2Y2mI8slwGCk0NQr_KywnI7xo_ZYVtqr2GmUO7laro" },
});
const bobId = (await parcelBob.getCurrentIdentity()).id;
// Upload a document and give Acme access to it.
console.log('Uploading input document as Bob.');
const recipeDocument = await parcelBob.uploadDocument(Buffer.from('{ "accounts": [ { "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "balances": { "available": 110, "current": 110, "iso_currency_code": "USD", "limit": null, "unofficial_currency_code": null }, "mask": "0000", "name": "Plaid Checking", "official_name": "Plaid Gold Standard 0% Interest Checking", "subtype": "checking", "type": "depository" } ], "transactions": [ { "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 2307.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Shops", "Computers and Electronics" ], "category_id": "19013000", "date": "2017-01-29", "datetime": null, "authorized_date": "2017-01-27", "authorized_datetime": null, "location": { "address": "300 Post St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.740352, "lon": -74.001761, "store_number": "1235" }, "name": "Apple Store", "merchant_name": "Apple", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" }, { "account_id": "aWaSaj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 1.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Shops", "Grocery" ], "category_id": "190130120", "date": "2017-01-30", "datetime": null, "authorized_date": "2017-01-30", "authorized_datetime": null, "location": { "address": "1 First St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.20352, "lon": -74.11761, "store_number": "1235" }, "name": "Safeway", "merchant_name": "Safeway", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "asdw3nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" }, { "account_id": "bawedSaj1m4HMXBm9WZZmCWVbPjX16EHwv99vp", "amount": 1200.21, "iso_currency_code": "USD", "unofficial_currency_code": null, "category": [ "Institution", "Financial" ], "category_id": "190130120", "date": "2017-01-30", "datetime": null, "authorized_date": "2017-01-30", "authorized_datetime": null, "location": { "address": "112 First St", "city": "San Francisco", "region": "CA", "postal_code": "94108", "country": "US", "lat": 40.20352, "lon": -74.11761, "store_number": "1235" }, "name": "Coinbase", "merchant_name": "Coinbase", "payment_meta": { "by_order_of": null, "payee": null, "payer": null, "payment_method": null, "payment_processor": null, "ppd_id": null, "reason": null, "reference_number": null }, "payment_channel": "in store", "pending": false, "pending_transaction_id": null, "account_owner": null, "transaction_id": "asdw3nR6CDn5okmGQ6hEpMo4lLNoSrzqDje", "transaction_code": null, "transaction_type": "place" } ], "item": { "available_products": [ "balance", "identity", "investments" ], "billed_products": [ "assets", "auth", "liabilities", "transactions" ], "consent_expiration_time": null, "error": null, "institution_id": "ins_3", "item_id": "eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6", "update_type": "background", "webhook": "https://www.genericwebhookurl.com/webhook" }, "total_transactions": 1, "request_id": "45QSn"}'), { toApp: undefined }).finished;
await parcelBob.createGrant({
    grantee: "A67Pp9Xu7MnEQ5dus5LEy31",
    condition: { 'document.id': { $eq: recipeDocument.id } },
});
// #endregion snippet-input-documents
// --- Run compute job as Acme.
const parcelAcme = new Parcel({
    clientId: "CVBKpDsVauJYRWBuuAvc7M7",
    privateKey: { "alg": "ES256", "use": "sig", "kty": "EC", "crv": "P-256", "x": "rfehJo8tmk8o1UF884LOx_sTtOvyj8q5UjCAec_RqkA", "y": "-JIXYwnsUEKUWiikMx5k0VGMqD4kunHcDWg9OGa88os", "d": "j2Y2mI8slwGCk0NQr_KywnI7xo_ZYVtqr2GmUO7laro" },
});
// #region snippet-successful-download
const recipeDownload = parcelAcme.downloadDocument(recipeDocument.id);
const recipeSaver = fs.createWriteStream(`./bob_data_by_acme`);
try {
    console.log(`Attempting to access Bob's document...`);
    await recipeDownload.pipeTo(recipeSaver);
    console.log('Successful download! (this was expected)');
}
catch (error) {
    console.log(`Acme was not able to directly access Bob's data: ${error}`);
}
// #endregion snippet-successful-download
// #region snippet-job-request
// Define the job.
const jobSpec = {
    name: 'word-count',
    image: 'bash',
    inputDocuments: [{ mountPath: 'recipe.txt', id: recipeDocument.id }],
    outputDocuments: [{ mountPath: 'count.txt', owner: bobId }],
    cmd: [
        '-c',
        'echo "*** Document has $(grep -c -i Coinbase </parcel/data/in/recipe.txt) occurances of Coinbase transactions ***" >/parcel/data/out/count.txt',
    ],
};
// #endregion snippet-job-request
// #region snippet-job-submit-wait
// Submit the job.
console.log('Running the job as Acme.');
const jobId = (await parcelAcme.submitJob(jobSpec)).id;
// Wait for job to finish.
let job;
do {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // eslint-disable-line no-promise-executor-return
    job = await parcelAcme.getJobStatus(jobId);
    console.log(`Job status is ${JSON.stringify(job.status)}`);
} while (job.status.phase === JobPhase.PENDING || job.status.phase === JobPhase.RUNNING);
console.log(`Job ${jobId} completed with status ${job.status.phase} and ${job.status.outputDocuments.length} output document(s).`);
// #endregion snippet-job-submit-wait
// Obtain compute job output -- again as Bob, because the computation was confidential and Acme
// does not have access to the output data.
// #region snippet-job-output
console.log('Downloading output document as Bob.');
const outputDownload = parcelBob.downloadDocument(job.status.outputDocuments[0].id);
const outputSaver = fs.createWriteStream(`/tmp/output_document`);
await outputDownload.pipeTo(outputSaver);
const output = fs.readFileSync('/tmp/output_document', 'utf-8');
console.log(`Here's the computed result: "${output}"`);
// #endregion snippet-job-output
