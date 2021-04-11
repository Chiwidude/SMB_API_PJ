/* eslint-disable max-len */

import needle from "needle";
import dotdev from 'dotenv';
import {BuildDoc} from '../../src/types/build';
dotdev.config();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const url =  `http://localhost:${process.env.PORT}/api/v1/builds`;

describe("Testing RestAPI Builds verbs responses", () =>{
    describe("GET /builds", () => {
        it("should return status code 200", (done)=>{
            needle.get(url, (error, response) =>{
                expect(response.statusCode).toBe(200);             
                done();
            });
        });
        it("Response should be an array of JSON objects", (done)=>{
            needle.get(url, (err, res)=> {                
                expect(()=> {const builds = <BuildDoc[]>res.body;}).not.toThrow();
                done();
            })
        })
    });
    describe("POST /builds/create", () => {
        it("should return status code 201 when sent correct body", (done) =>{ 
            needle.post(url+"/create", {rating: "4.2", title:"Sample Title Build testing", "gods":["Merlin"], "roles": ["mage"], "user": "chiwidude", "date":"10th april 2021"}, {json:true},
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
            needle.delete(url+"/delete/607263224ccaac1c04cd6724", null, (err, res)=> {
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
            needle.put(url+"/606353caccce0209f8ea8dd4",{"gods":["Zeus, Tiamat"],"roles":["mage"],"rating":"4.5","title":"Sample Build 1","user":"Chiwidude","date":"30/03/2021"}, {json:true}
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

