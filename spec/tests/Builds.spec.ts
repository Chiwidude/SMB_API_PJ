/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { expect } from 'chai'
import sinon from 'sinon'
import dbBuilds from '../../src/routes/_helpers/BuildsDB'
import {createBuild, deleteBuild, getBuildWId, getBuilds, updateBuild} from '../../src/routes/controllers/builds.controller'
import 'mocha'

describe('Builds controller functions', ()=> {
    describe('Build creation db', ()=> {
        let status:any, json:any, request:any, response:any, body;
        beforeEach(()=> {
            status = sinon.stub();
            json = sinon.spy();
            response = {json,status};
            status.returns(response);            
        });          
        body = {rating: "4.2", title:"Sample Title Build testing", gods:["Merlin"], roles: ["mage"], user: "chiwidude", date:"12th april 2021"};
        const stubValue :any = {
            _id: "6092ead85c822b0718cff3c1",
            rating: "4.2", 
            title:"Sample Title Build testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }
        request = {body}
        it('should create a new build', async () => {
            const stub = sinon.stub(dbBuilds, 'createBuild').returns(stubValue)
            await createBuild(request, response)
            expect(status.args[0][0]).to.equal(201);
            stub.restore();
        })
        body = {rating: "4.2", gods:["Merlin"], roles: ["mage"], user: "chiwidude", date:"12th april 2021"};        
        request = {body}
        it('should not save the build, because there\'s no title', async()=> {
            const stub = sinon.stub(dbBuilds, 'createBuild').callsFake(()=> {
                throw new Error('One or more of the required parameters was missing.');
            })
            await createBuild(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.args[0][0].error).to.be.equal('One or more of the required parameters was missing.');
            stub.restore();
        });
    });


    describe('Delete builds db', ()=> {
        let  status:any, json:any, response:any, body:any, request:any;
        beforeEach(()=> {
            status = sinon.stub();
            json = sinon.spy();
            response = {json,status};
            status.returns(response);
        });  
                
        const stubValue :any = {
            _id: "6092ead85c822b0718cff3c1",
            rating: "4.2", 
            title:"Sample Title Build testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }
        request = {body,params: {id:"6092ead85c822b0718cff3c1"}}
        it('should not save the build, because there\'s no title', async()=> {
            const stub = sinon.stub(dbBuilds, 'deleteBuild').callsFake(()=> {
                throw new Error("Internal Server Error");
            })
            await deleteBuild(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal Server Error");
            stub.restore();
        });
        request = {body,params: {id:"6092ead85c822b0718cff3c1"}}
        it('should delete the build', async () => {
            const stub = sinon.stub(dbBuilds, 'deleteBuild').returns(stubValue)
            await deleteBuild(request, response)
            expect(status.args[0][0]).to.equal(204);
            stub.restore();
        })
    });


    describe('getallBuilds', ()=> {
        let  status:any, json:any, response:any, request:any;
        beforeEach(()=> {
            status = sinon.stub();
            json = sinon.spy();
            response = {json,status};
            status.returns(response);
        });  
                
        const stubValue :any = [{
            _id: "6092ead85c822b0718cff3c1",
            rating: "4.2", 
            title:"Sample Title Build testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }] 
        request = {query:{user:''}};      
        it('should return an object with an array', async()=> {
            const stub = sinon.stub(dbBuilds, 'getBuilds').returns(stubValue)
            await getBuilds(request, response)
            expect(status.args[0][0]).to.equal(200);            
            expect(json.args[0][0].builds).to.be.an('array')
            stub.restore();
        });
        
        it('should not return an array', async () => {
            const stub = sinon.stub(dbBuilds, 'getBuilds').callsFake(() => {
                throw new Error("Internal server error")
              })
            await getBuilds(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal server error");
            stub.restore();
        })
    });

    describe('update Build', ()=> {
        let  status:any, json:any, response:any, request:any, body:any;
        beforeEach(()=> {
            status = sinon.stub();
            json = sinon.spy();
            response = {json,status};
            status.returns(response);
        });  
                
        const stubValue :any = {
            _id: "6092ead85c822b0718cff3c1",
            rating: "4.0", 
            title:"This is an updated title",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }
        body = {
            title:"This is an updated title",
            rating: "4.0"
        }
        request = {body, params:{id: "6092ead85c822b0718cff3c1" }};      
        it('should update the build', async()=> {
            const stub = sinon.stub(dbBuilds, 'updateBuild').returns(stubValue)
            await updateBuild(request, response)
            expect(status.args[0][0]).to.equal(204);
            stub.restore();
        });
        it('should not update the build', async () => {
            const stub = sinon.stub(dbBuilds, 'updateBuild').callsFake(() => {
                throw new Error("Internal server error")
              })
            await updateBuild(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal server error");
            stub.restore();
        })
    });
});

