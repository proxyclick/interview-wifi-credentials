import { handleCheckin } from "../process/process";
import { expect } from "chai";
import { CredentialsService } from "../proxyclick/credentials";
import * as sinon from "sinon";
import { VisitorsService } from "../proxyclick/visitors";

// Do not modify this file
// TODO: Make sure all the test cases pass.
// Read carefully the description of the tests

describe("Main paths", () => {
  it("Should find the visitor, generate credentials and returns it", async () => {
    const event = {
      email: "dtargaryen@proxyclick.com",
    };

    expect(await handleCheckin(event)).to.deep.equals({
      username: "dtargaryen",
      password: "308f0103",
    });
  });

  it("Should find the visitor, identify a mismatch, and update it", async () => {
    const event = {
      firstname: "Khal",
      lastname: "Drogo",
      email: "kdrogo@doth.raki",
    };
    const spy = sinon.spy(VisitorsService, "updateVisitor");
    expect(await handleCheckin(event)).to.deep.equals({
      username: "kdrogo",
      password: "81f9d5db",
    });

    expect(
      spy.calledWith("kdrogo@doth.raki", {
        firstname: "Khal",
        lastname: "Drogo",
      })
    ).to.be.true;
  });

  it("Should store the credentials and not generate it twice", async () => {
    const event = {
      email: "jon@snow.com",
    };

    const spy = sinon.spy(CredentialsService, "generate");

    expect(await handleCheckin(event)).to.deep.equals({
      username: "jsnow",
      password: "48c2cf16",
    });

    expect(await handleCheckin(event)).to.deep.equals({
      username: "jsnow",
      password: "48c2cf16",
    });

    expect(spy.calledOnce).to.be.true;
  });
});
