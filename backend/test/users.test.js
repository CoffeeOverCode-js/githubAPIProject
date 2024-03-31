//Imports Chai's except function for assertions
import { expect } from "chai";

// Importing the 'request' library to make HTTP requests
import request from "request";

// Test suite for checking status and page content of
// Users details and Repos page
describe("Status and page-content", () => {
  // Describe block for Users Details and Repos page
  describe("Users details and Repos page", () => {
    // Tests the status of the request
    it("status", (done) => {
      // Makes a HTTP request to the user endpoint with
      // parameter CoffeeOverCode-js
      request(
        "http://localhost:8080/user/CoffeeOverCode-js",
        (e, res, body) => {
          // Checks to see if the re is equal to statusCode 200
          expect(res.statusCode).to.equal(200);
          // Completes the test
          done();
        }
      );
    });

    // Test to see if it contains specific data in the page-content
    it("page-content", (done) => {
      // Makes a HTTP request to the user endpoint with
      // parameter CoffeeOverCode-js
      request(
        "http://localhost:8080/user/CoffeeOverCode-js",
        (e, res, body) => {
          // Checks to see if the body contains the tring value "'login': 'CoffeeOverCode-js'"
          expect(body).to.include(`"login":"CoffeeOverCode-js"`);
          // Completes the test
          done();
        }
      );
    });
  });
});
