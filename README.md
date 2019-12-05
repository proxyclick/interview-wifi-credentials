# Visitor WiFi Credentials generator exercise

This is a WiFi credentials generator micro-service that responds to Visitor check-in events with credentials (username/password)

The function to generate the credentials is provided and is located in `proxyclick/credentials.ts`
The function to search visitors in the database is provided and is located in `proxyclick/visitors.ts`
Do not modify those files

# Goal

* Make sure that all the tests cases located in `process.test.ts` pass
* Please put your code in the function `handleCheckin` located in process/process.ts
* Feel free to create more files with your structured code if you feel it is necessary
* For the last test case, we would like to optimize the process so that consecutive checks-in of the same visitor do not need to call `generate` multiple times. The first result should be saved in-memory

# Commands

* `npm install` install the necessary dependencies
* `npm run build` build the javascript
* `npm start` run the process
* `npm run watch` continuously build and run the process
* `npm test` continously run the test cases

If you have any questions, feel free to contact us