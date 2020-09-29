# Visitor WiFi Credentials generator exercise

## Part 1

This is a WiFi credentials generator micro-service that responds to Visitor check-in events with credentials (username/password)

The function to generate the credentials is provided and is located in `proxyclick/credentials.ts`
The visitors should be searched through via the Proxyclick API: https://api.proxyclick.com/v1/docs/#introduction

- The company ID to be used is the following: CO-CXER585
- Client ID: `98C5EB84170E6FB3617C47A5B17ECFACB4A0FD49`
- Client secret will be sent via email

# Goal

- Make sure that all the tests cases located in `visitors.test.ts` and `process.test.ts` pass. Do not modify the test files
- Start by writing the body of the function `getVisitors` that search through visitors using Proxyclick API
- Then, write code in the function `handleCheckin` located in process/process.ts
- Feel free to create more files with your structured code if you feel it is necessary
- For the last test case, we would like to optimize the process so that consecutive checks-in of the same visitor do not need to call `generate` multiple times. The first result should be saved in-memory
- Create a zip file with your solution (the project) and send it back to your interviewer

# Flow

1. Check-in event coming in. Find visitor corresponding to email from Proxyclick API
2. If visitor not found -> throw an error
3. If visitor is found but firstname/lastname mismatch -> Update visitor using the function `updateVisitor`
4. Generate credentials for this visitor and returns it

## Part 2

Please write the function in `sender.ts` that will call the `EmailSender.sendEmail()` function.
If `sendEmail()` throws an error, it should retry 4 times with 10min interval, then stop retrying while logging an error message.
Please write the unit tests for this function

## Part 3

Please write an API that will serve your previously defined functions

- GET /visitors: this endpoint should allow to search visitors and return an array of visitors by calling the `getVisitors`
- POST /check-in: This endpoint receives a `VisitorEvent` in the POST body and should call the `handleCheckin`. It should returns a 204 if everything went well.

* Write your code in the /api folder
* Feel free to use any framework for writing your API
* Make sure to handle error cases and return appropriate responses
* Please write unit tests for the API endpoints

## Part 4

Please do the architecture exercice located in Webhooks.md

## Commands

- `npm install` install the necessary dependencies
- `npm run build` build the javascript
- `npm start` run the process
- `npm run watch` continuously build and run the process
- `npm test` continously run the test cases

If you have any questions, feel free to contact us
