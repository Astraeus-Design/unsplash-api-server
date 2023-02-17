"use strict";

const server = require("../server");

const supertest = require("supertest");

const mockRequest = supertest(server.app);

describe("mock testing of server.js code", () => {
  it("tests the / home route which is not a valid path(wildcard)", async () => {
    const response = await mockRequest.get("/");
    //console.log(response);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual(`route requested does not exist /`);
  });

  it("tests the /randomimage and return type as object", async () => {
    const response = await mockRequest.get("/randomimage");
    //console.log(response);
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual(`object`);
  });

  it("tests the /randomimage route as an invalid post method", async () => {
    const response = await mockRequest.post("/randomimage");
    //console.log(response);
    expect(response.status).toEqual(404);
    expect(typeof response.body).toEqual("object");
  });

  it("tests the /searchimage route with params", async () => {
    const data = { query: "cat" };
    const response = await mockRequest.get("/searchimage").query(data);
    //console.log(response);
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });

  it("tests the /searchimage route without params", async () => {
    const response = await mockRequest.get("/searchimage");
    //console.log(response);
    expect(response.status).toEqual(404);
    //expect(response.text).toEqual("home route");
  });
});
