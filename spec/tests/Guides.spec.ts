/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import needle from "needle";
import dotdev from 'dotenv';
import {GuideDoc} from '../../src/types/guide';
dotdev.config();

const url =  `http://localhost:${process.env.PORT}/api/v1/guides`;

describe("Testing restAPI Guides endpoints responses", () => {
    describe("GET /guides", () =>{
        it("Should return code 200", (done) => {
            needle.get(url, (err, res)=> {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
        it("Response should be an array of JSON objects", (done)=>{
            needle.get(url, (err, res)=> {                
                expect(()=> {const guides = <GuideDoc[]>res.body;}).not.toThrow();
                done();
            });
        });
    });
    describe("POST /builds/create", () => {
        it("should return status code 201 when sent correct body", (done) =>{ 
            needle.post(url+"/create", {"rating": "4.5", "title":"Sample Guide Testing", "gods":["Ah-Puch"], "roles": ["mage"], "user": "chiwidude", "date":"12/04/2021"}, {json:true},
             (err, res) => {
                 expect(res.statusCode).toBe(201);
                 done();
             });                    
        });
        it("should return bad request status code when title not sent in body", (done) => {
            needle.post(url+"/create", {rating: "4.2", "gods":["Merlin"], "roles": ["mage"], "user": "chiwidude", "date":"10th april 2021"}, {json:true},
            (err, res) => {
                expect(res.statusCode).toBe(400);
                done();
            }); 
        });
    });
    describe("DELETE /builds/delete/:id", () => {
        it("should delete the document from the db when a valid id is sent", (done) => {
            needle.delete(url+"/delete/60752f48f8ba081c10a86597", null, (err, res)=> {
                expect(res.statusCode).toBe(204);
                done();
            });
        });
        it("should return 404 code, not found when id is not in the db", (done) => {
            needle.delete(url+"/delete/60725a2d4ccaac1c04cd6709", null, (err, res)=> {
                expect(res.statusCode).toBe(404);
                done();
            });
        })
    });

    describe("PUT /:id", () => {
        it("should update the document in the db when an existing id is sent", (done) => {
            needle.put(url+"/6062927c7aba871250a7957c",{"gods":["Xbalanque, Hachiman"],"roles":["hunter"],"rating":"4.5","title":"Sample Guide 1","user":"Chiwidude","date":"12/04/2021"}, {json:true}
            , (err, res)=> {
                expect(res.statusCode).toBe(204);
                done();
            });
        });
        it("should return code 404 when there's no document with the id sent", (done) => {
            needle.put(url+"/60725a2d4ccaac1c04cd6709",{"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"}, {json:true}
            , (err, res)=> {
                expect(res.statusCode).toBe(404);
                done();
            });
        })
    });
});