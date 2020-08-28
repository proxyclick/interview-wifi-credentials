import { VisitorsService } from "../proxyclick/visitors";
import { expect } from "chai";
import { visitors } from "../../data/visitors";

// Do not modify this file
// TODO: Make sure all the test cases pass.
// Read carefully the description of the tests

describe("Search visitors", () => {
  it("Should find Tyrion", async () => {
    const tyrion = await VisitorsService.getVisitors({
      email: "tyrion@lannister.com",
    });

    expect(tyrion).to.deep.equals([visitors[3]]);
  });

  it("Should returns an empty array", async () => {
    const ned = await VisitorsService.getVisitors({ email: "ned@stark.com" });

    expect(ned).to.deep.equals([]);
  });

  it("Should returns all the one that works on the Wall", async () => {
    const nightWatch = await VisitorsService.getVisitors({
      companyName: "The Wall",
    });

    expect(nightWatch).to.deep.equals([visitors[1], visitors[5]]);
  });

  it("Should get only Jon Snow", async () => {
    const jon = await VisitorsService.getVisitors({
      email: "jon@snow.com",
      companyName: "The Wall",
    });

    expect(jon).to.deep.equals([visitors[1]]);
  });
});
