/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import dotdev from 'dotenv';
import request from "supertest";
import app from "../../src/index";
import {GuideDoc} from '../../src/types/guide';
dotdev.config();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions

/*describe("Testing RestAPI Guides verbs responses", () =>{
    describe("GET /guides", () => {
        it("should return status code 200", (done)=>{
            request(app)
            .get("/api/v1/guides")
            .end((err, res) => {
                expect(res.status).toBe(200);
                done();
            })
        });
        it("Response should be an array of JSON objects", (done)=>{
           
            request(app)
            .get("/api/v1/guides")
            .end((err, res) => {
                expect(()=> {
                    const guides = <GuideDoc[]> res.body;
                }).not.toThrow();
                done();
            })
        })
    });
    describe("POST /guides/create", () => {
        it("should return status code 201 when sent correct body", (done) =>{
            request(app).
            post("/api/v1/guides/create")
            .send({"rating": "4.2", "title":"Sample Title Guide testing", "gods":["Rama"], "roles": ["hunter"], "user": "chiwidude", "date":"13/04/2021"})
            .end((err, res) =>{
                expect(res.status).toBe(201);
                done();
            })                               
        });
        it("should return bad request status code when title not sent in body", (done) => {
            request(app).
            post("/api/v1/guides/create")
            .send({"rating": "4.2", "gods":["Merlin"], "roles": ["mage"], "user": "chiwidude", "date":"12th april 2021"})
            .end((err, res) =>{
                expect(res.status).toBe(400);
                done();
            }) 
        });
    });
    describe("DELETE /guides/delete/:id", () => {
        it("should delete the document from the db when a valid id is sent", (done) => {
            request(app).
            delete("/api/v1/guides/delete/6075ebf4a0a5991c30c6fe0e").
            end( (err, res)=> {
                expect(res.status).toBe(204);
                done();
            })
        });
        it("should return 404 code, not found when id is not in the db", (done) => {
            request(app)
            .delete("/api/v1/guides/delete/60725a2d4ccaac1c04cd6709")
            .end((err, res) =>{
                expect(res.status).toBe(404);
                done();
            })
        })
    });
   describe("PUT /:id", () => {
        it("should update the document in the db when an existing id is sent", (done) => {
            request(app)
            .put("/api/v1/guides/6075ec724d077f1b608293de")
            .send({"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"})
            .end((err,res) => {
                expect(res.status).toBe(204);
                done();
            })
        });
        it("should return code 404 when there's no document with the id sent", (done) => {
            request(app)
            .put("/api/v1/guides/60725a2d4ccaac1c04cd6709")
            .send({"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"})
            .end((err,res) => {
                expect(res.status).toBe(404);
                done();
            })
        });
    });
});*/

