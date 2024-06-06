const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

const { faker } = require('@faker-js/faker/locale/id_ID');

require("dotenv").config();

/* Connecting to the database before each test */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

var blogId = null;

// test get blog
describe("Get Blogs", () => {
    it("should return all blogs", async () => {
        const response = await request(app).get("/blog");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

// test create blog
describe("Create Blog", () => {
    it("should create a new blog", async () => {
        const data = {
            "title": faker.lorem.sentence(4),
            "content": faker.lorem.sentences(),
            "author": faker.person.fullName(),
            "coverImage": faker.image.urlLoremFlickr()
        }
        const response = await request(app).post("/blog").send(data);
        blogId = response.body.data._id;
        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Successfully created a new blog");
    });
});

// test update blog
describe("PUT Blog", () => {
    it("should update a blog", async () => {
        const data = {
            "title": faker.lorem.sentence(4),
            "content": faker.lorem.sentences(),
            "author": faker.person.fullName(),
            "coverImage": faker.image.urlLoremFlickr()
        }
        const response = await request(app).put("/blog/"+blogId).send(data);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Successfully update blog");
    });
});

// test delete blog
describe("Delete Blog", () => {
    it("should delete a blog", async () => {
        const response = await request(app).delete("/blog/"+blogId);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Successfully delete blog");
    })
})