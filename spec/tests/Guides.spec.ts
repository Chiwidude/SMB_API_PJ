/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */


// eslint-disable-next-line @typescript-eslint/restrict-template-expressions

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { expect } from 'chai'
import sinon from 'sinon'
import dbGuides from '../../src/routes/_helpers/GuidesDB'
import {createGuide, deleteGuide, getGuideWId, getGuides, updateGuide} from '../../src/routes/controllers/guides.controller'
import 'mocha'

describe('Guides controller functions', ()=> {
    describe('Guide creation db', ()=> {
        let status:any, json:any, request:any, response:any, body;
        beforeEach(()=> {
            status = sinon.stub();
            json = sinon.spy();
            response = {json,status};
            status.returns(response);            
        });          
        body = {rating: "4.2", title:"Sample Title Guide testing", gods:["Merlin"], roles: ["mage"], user: "chiwidude", date:"12th april 2021"};
        const stubValue :any = {
            _id: "6092ead85c822b0718cff3c1",
            rating: "4.2", 
            title:"Sample Title Guide testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }
        request = {body}
        it('should create a new build', async () => {
            const stub = sinon.stub(dbGuides, 'createGuide').returns(stubValue)
            await createGuide(request, response)
            expect(status.args[0][0]).to.equal(201);
            stub.restore();
        })
        body = {rating: "4.2", gods:["Merlin"], roles: ["mage"], user: "chiwidude", date:"12th april 2021"};        
        request = {body}
        it('should not save the build, because there\'s no title', async()=> {
            const stub = sinon.stub(dbGuides, 'createGuide').callsFake(()=> {
                throw new Error('One or more of the required parameters was missing.');
            })
            await createGuide(request, response)
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
            title:"Sample Title Guide testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }
        request = {body,params: {id:"6092ead85c822b0718cff3c1"}}
        it('should not save the build, because there\'s no title', async()=> {
            const stub = sinon.stub(dbGuides, 'deleteGuide').callsFake(()=> {
                throw new Error("Internal Server Error");
            })
            await deleteGuide(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal Server Error");
            stub.restore();
        });
        request = {body,params: {id:"6092ead85c822b0718cff3c1"}}
        it('should delete the build', async () => {
            const stub = sinon.stub(dbGuides, 'deleteGuide').returns(stubValue)
            await deleteGuide(request, response)
            expect(status.args[0][0]).to.equal(204);
            stub.restore();
        })
    });


    describe('getallGuides', ()=> {
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
            title:"Sample Title Guide testing",
             gods:["Merlin"], roles: ["mage"],
              user: "chiwidude", 
              date:"12th april 2021",
              __v:0
        }] 
        request = {query:{user:''}};      
        it('should return an object with an array', async()=> {
            const stub = sinon.stub(dbGuides, 'getGuides').returns(stubValue)
            await getGuides(request, response)
            expect(status.args[0][0]).to.equal(200);            
            expect(json.args[0][0].guides).to.be.an('array')
            stub.restore();
        });
        
        it('should not return an array', async () => {
            const stub = sinon.stub(dbGuides, 'getGuides').callsFake(() => {
                throw new Error("Internal server error")
              })
            await getGuides(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal server error");
            stub.restore();
        })
    });

    describe('update Guide', ()=> {
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
            const stub = sinon.stub(dbGuides, 'updateGuide').returns(stubValue)
            await updateGuide(request, response)
            expect(status.args[0][0]).to.equal(204);
            stub.restore();
        });
        it('should not update the build', async () => {
            const stub = sinon.stub(dbGuides, 'updateGuide').callsFake(() => {
                throw new Error("Internal server error")
              })
            await updateGuide(request, response)
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(500);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].error).to.be.equal("Internal server error");
            stub.restore();
        })
    });
});

