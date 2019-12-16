import { handleCheckin } from "../process/process"
import { expect } from "chai"
import { CredentialsService } from "../proxyclick/credentials";
import * as sinon from 'sinon';
import { VisitorsService } from "../proxyclick/visitors";

// Do not modify this file
// TODO: Make sure all the test cases pass. 
// Read carefully the description of the tests

describe('Errors cases', () => {

    it('Should return an error if visitor is not found', () => {

        const event = {
            email: 'incognito_guy@unknown.com'
        }
        expect(() => handleCheckin(event)).to.throw('Visitor not found');
    });
});

describe('Happy paths', () => {

    it('Should find the visitor, generate credentials and returns it', () => {

        const event = {
            email: "dtargaryen@proxyclick.com",
        }

        expect(handleCheckin(event)).to.deep.equals({
            username: 'dtargaryen',
            password: '76bd7564'
        })
    });

    it('Should find the visitor, identify a mismatch, and update it', () => {
        const event = {
            firstname: "Khal",
            lastname: "Drogo",
            email: "kdrogo@doth.raki"
        }
        const spy = sinon.spy(VisitorsService, 'updateVisitor');
        expect(handleCheckin(event)).to.deep.equals({
            username: 'kdrogo',
            password: '4d323850'
        })

        expect(spy.calledWith('kdrogo@doth.raki', {
            firstname: "Khal",
            lastname: "Drogo"
        })).to.be.true;
    })


    it('Should store the credentials and not generate it twice', () => {
        const event = {
            email: "jon@snow.com",
        }

        const spy = sinon.spy(CredentialsService, 'generate');

        expect(handleCheckin(event)).to.deep.equals({
            username: 'jsnow',
            password: 'dda7edec'
        })

        expect(handleCheckin(event)).to.deep.equals({
            username: 'jsnow',
            password: 'dda7edec'
        })

        expect(spy.calledOnce).to.be.true;
    });
})
