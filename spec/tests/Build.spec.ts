/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import dotdev from 'dotenv';
import request from "supertest";
import app from "../../src/index";
import {BuildDoc} from '../../src/types/build';
import mongoose from 'mongoose';
dotdev.config();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions

/*describe("Testing RestAPI Builds verbs responses", () =>{
    let Data = {
        token:"",
        username: "",
        id:""
    };
    beforeAll(() =>{
        request(app)
        .post("/api/v1/users/signup")
        .send({"name":"Tester", "username":"testmaster", "email":"tmaster@email.com","password":"12345", "description":"I'm the tester"})
        .end((err, res) => {
            request(app)
            .post("/api/v1/users/login")
            .send({"email":"tmaster@email.com", "password":"12345"})
            .end((err,res) => {
                if(res.status === 200){
                    Data = res.body;
                }     
            })            
        });
    });
    /*afterAll(async () => {
        const res = await mongoose.connection.db.dropCollection("user");
    }) 
    describe("GET /builds", () => {

        it("should return status code 200", (done)=>{
            request(app)
            .get("/api/v1/builds")
            .set('authorization',`Bearer ${Data.token}`)
            .end((err, res) => {
                expect(res.status).toBe(200);
                done();
            })
        });
        it("Response should be an array of JSON objects", (done)=>{
           
            request(app)
            .get("/api/v1/builds")            
            .end((err, res) => {
                expect(()=> {
                    const build = <BuildDoc[]> res.body;
                }).not.toThrow();
                done();
            })
        })
    });
    describe("POST /builds/create", () => {
        it("should return status code 201 when sent correct body", (done) =>{
            request(app).
            post("/api/v1/builds/create")
            .set('authorization',`Bearer ${Data.token}`)
            .send({"rating": "4.2", "title":"Sample Title Build testing", "gods":["Merlin"], "roles": ["mage"], "user": "chiwidude", "date":"12th april 2021"})
            .end((err, res) =>{
                expect(res.status).toBe(201);
                done();
            })                               
        });
        it("should return bad request status code when title not sent in body", (done) => {
            request(app).
            post("/api/v1/builds/create")
            .send({"rating": "4.2", "gods":["Merlin"], "roles": ["mage"], "user": "chiwidude", "date":"12th april 2021"})
            .end((err, res) =>{
                expect(res.status).toBe(400);
                done();
            }) 
        });
    });
    describe("DELETE /builds/delete/:id", () => {
        it("should delete the document from the db when a valid id is sent", (done) => {
            request(app).
            delete("/api/v1/builds/delete/6075472e9944b81bec61cdc0").
            end( (err, res)=> {
                expect(res.status).toBe(204);
                done();
            })
        });
        it("should return 404 code, not found when id is not in the db", (done) => {
            request(app)
            .delete("/api/v1/builds/delete/60725a2d4ccaac1c04cd6709")
            .end((err, res) =>{
                expect(res.status).toBe(404);
                done();
            })
        })
    });
   describe("PUT /:id", () => {
        it("should update the document in the db when an existing id is sent", (done) => {
            request(app)
            .put("/api/v1/builds/6075447683945a1540e4d960")
            .send({"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"})
            .end((err,res) => {
                expect(res.status).toBe(204);
                done();
            })
        });
        it("should return code 404 when there's no document with the id sent", (done) => {
            request(app)
            .put("/api/v1/builds/60725a2d4ccaac1c04cd6709")
            .send({"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"})
            .end((err,res) => {
                expect(res.status).toBe(404);
                done();
            })
        });
    });
});*/

