# Visitor WiFi Credentials generator exercise

This is a WiFi credentials generator micro-service that responds to Visitor check-in events with credentials (username/password).

# Usage

-   `npm install` install the necessary dependencies
-   `npm run build` build the javascript
-   `npm start` run the process
-   `npm run watch` continuously build and run the process
-   `npm test` continously run the test cases

# Supposed flow

A Visitor checks in, triggering a Visitor event.

1.  Find the Visitor by querying the Proxyclick API
2.  If the Visitor is not found, throw an Error
3.  If the first name or last name mismatch, update the Visitor
4.  Generate and returns WiFi credentials for this Visitor

# Goal

1.  Implement `getVisitors()` in `src/proxyclick/visitors.ts`
2.  Implement `handleCheckin()` in `src/process/process.ts`

_Do not edit the test files and make sure they all pass._

# Details

## Get Visitors

Implement `getVisitors()` in `src/proxyclick/visitors.ts`.

Use the [Proxyclick API](ttps://api.proxyclick.com/v1/docs/#introduction) to search for visitors by email and/or company name. Use the following parameters to get an access token.

| Parameter       | Value                                      |
| :-------------- | :----------------------------------------- |
| `client_id`     | `98C5EB84170E6FB3617C47A5B17ECFACB4A0FD49` |
| `client_secret` | The secret sent by mail                    |
| `email`         | The email you were registered with         |
| `password`      | The password you set when you registered   |

The company ID in which to look for Visitors is `CO-CXER585`.

## Handle Visitor check-in event

Implement `handleCheckin()` in `src/process/process.ts`.

This function must:

-   Get a Visitor by using `getVisitors()`, throw an Error if none is found.
-   Update a Visitor by calling `updateVisitor()` in `src/proxyclick/visitors.ts` if the first or last name mismatch.
-   Generate credentials for the Visitor by calling `generate()` in `src/proxyclick/credentials.ts`, store them, and return them. If previous credentials are stored for a Visitor, don't generate them again.

If you have any questions, feel free to contact us
