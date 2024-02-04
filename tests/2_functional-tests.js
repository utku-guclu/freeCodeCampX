const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Viewing one stock", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "AAPL" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.property(res.body.stockData, "stock");
        assert.property(res.body.stockData, "price");
        assert.property(res.body.stockData, "likes");
        done();
      });
  });

  test("Viewing one stock and liking it", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "AAPL", like: true })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.property(res.body.stockData, "stock");
        assert.property(res.body.stockData, "price");
        assert.property(res.body.stockData, "likes");
        assert.isAtLeast(res.body.stockData.likes, 1);
        done();
      });
  });

  test("Viewing the same stock and liking it again", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: "AAPL", like: true })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.property(res.body.stockData, "stock");
        assert.property(res.body.stockData, "price");
        assert.property(res.body.stockData, "likes");
        const initialLikes = res.body.stockData.likes;

        // Now, make a new request for the same stock and liking it again
        chai
          .request(server)
          .get("/api/stock-prices")
          .query({ stock: "AAPL", like: true })
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, "stockData");
            assert.property(res.body.stockData, "stock");
            assert.property(res.body.stockData, "price");
            assert.property(res.body.stockData, "likes");
            assert.isAbove(res.body.stockData.likes, initialLikes);
            done();
          });
      });
  });

  test("Viewing two stocks", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: ["AAPL", "GOOGL"] })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        assert.property(res.body.stockData[0], "stock");
        assert.property(res.body.stockData[0], "price");
        assert.property(res.body.stockData[0], "rel_likes");
        assert.property(res.body.stockData[1], "stock");
        assert.property(res.body.stockData[1], "price");
        assert.property(res.body.stockData[1], "rel_likes");
        done();
      });
  });

  test("Viewing two stocks and liking them", function (done) {
    chai
      .request(server)
      .get("/api/stock-prices")
      .query({ stock: ["AAPL", "GOOGL"], like: true })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, "stockData");
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        assert.property(res.body.stockData[0], "stock");
        assert.property(res.body.stockData[0], "price");
        assert.property(res.body.stockData[0], "rel_likes");
        assert.property(res.body.stockData[1], "stock");
        assert.property(res.body.stockData[1], "price");
        assert.property(res.body.stockData[1], "rel_likes");
        assert.isAbove(res.body.stockData[0].rel_likes, 0);
        assert.isAbove(res.body.stockData[1].rel_likes, 0);
        done();
      });
  });
});
