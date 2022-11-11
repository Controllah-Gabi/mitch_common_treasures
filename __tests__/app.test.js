const request = require("supertest");
const app = require("../app");
const db = require("../db");
const seed = require("../db/seed");
const testData = require("../db/data/test-data/index");

beforeEach(() => seed(testData));

afterAll(() => {
  if (db.end) db.end();
});

describe("GET /api/treasures", () => {
  test("status: 200, responds with an array of treasure objects", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures).toBeInstanceOf(Array);
        treasures.forEach((treasure) => {
          expect(treasure).toEqual(
            expect.objectContaining({
              treasure_id: expect.any(Number),
              treasure_name: expect.any(String),
              colour: expect.any(String),
              age: expect.any(Number),
              cost_at_auction: expect.any(Number),
              shop_name: expect.any(String),
            })
          );
        });
      });
  });
  test("status: 200, first index should be the youngest", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        const { treasures } = body;
        expect(treasures).toBeInstanceOf(Array);
        expect(treasures[0]).toEqual({
          treasure_id: 19,
          treasure_name: "treasure-q",
          colour: "magenta",
          age: 1,
          cost_at_auction: 60.99,
          shop_name: "shop-a",
        });
        const ageArray = treasures.map((treasure) => {
          return treasure.age;
        });
        expect(ageArray).toBeSorted();
      });
  });
});

test("status: 404, spelling mistake", () => {
  return request(app)
    .get("/api/treasure")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Route not found")}
    )}
)
 describe("/api/treasure?sort_by=cost_at_auction",()=>{
  test("Get: 200 - can sort array be given query",()=>{
    return request(app)
    .get('/api/treasures?sort_by=cost_at_auction')
     .expect(200)
    .then(({body})=>{
       expect(body.treasures).toBeSortedBy('cost_at_auction');
     })
 })
  })
   
    