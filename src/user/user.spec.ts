import * as chai from "chai";
import * as sinon from "sinon";
import * as mocha from "mocha";
import * as request from "supertest";
import * as path from "path";
const expect = chai.expect;
const should = chai.should();
import { userModel, User } from "./user.model";
import { app } from "../server";

describe("User Tests", () => {
  let sandbox;
  let usersDataMock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    usersDataMock = require(path.resolve(
      __dirname,
      "../../mock/data-mock/data-users.json"
    ));
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("GET /api/v1/users", () => {
    it("Should get all users", done => {
      const userModelFindStub = sandbox
        .stub(userModel, "find")
        .yields(undefined, usersDataMock);
      request(app)
        .get("/api/v1/users")
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(usersDataMock));
          done();
        });
    });
    it("Should return an error when trying to get all users", done => {
      const expectedError = { name: "Storage", message: "error" };
      const userModelFindStub = sandbox
        .stub(userModel, "find")
        .yields(expectedError, undefined);
      request(app)
        .get("/api/v1/users")
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(expectedError));
          done();
        });
    });
  });

  describe("GET /api/v1/users/5aaa94ea7e7239c0caba9dc9", () => {
    it("Should get a specific user by his id", done => {
      const userModelFindStub = sandbox
        .stub(userModel, "findById")
        .yields(undefined, usersDataMock[0]);
      request(app)
        .get("/api/v1/users/5aaa94ea7e7239c0caba9dc9")
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(usersDataMock[0]));
          done();
        });
    });
    it("Should return an error when trying to get all users", done => {
      const expectedError = { name: "Storage", message: "error" };
      const userModelFindStub = sandbox
        .stub(userModel, "findById")
        .yields(expectedError, undefined);
      request(app)
        .get("/api/v1/users/5aaa94ea7e7239c0caba9dc9")
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(expectedError));
          done();
        });
    });
  });

  describe("POST /api/v1/users", () => {
    it("Should save a user", done => {
      const newUser = { ...usersDataMock[0] };

      sandbox
        .stub(userModel.prototype, "save")
        .callsFake(() => Promise.resolve(newUser));

      request(app)
        .post("/api/v1/users")
        .send(newUser)
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(newUser));
          done();
        });
    });
    it("Should return an error when trying to add a user", done => {
      const newUser = { ...usersDataMock[0] };
      const expectedError = { name: "Storage", message: "error" };

      sandbox
        .stub(userModel.prototype, "save")
        .callsFake(() => Promise.reject(expectedError));

      request(app)
        .post("/api/v1/users")
        .send(newUser)
        .expect(500)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          res.text.should.be.eql(JSON.stringify(expectedError));
          done();
        });
    });
  });
});
