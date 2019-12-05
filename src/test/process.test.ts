import { handleCheckin } from "../process/process"
import { expect } from "chai"
import { CredentialsService } from "../proxyclick/credentials";
import * as sinon from 'sinon';

// Do not modify this file
// TODO: Make sure all the test cases pass. 
// Read carefully the description of the tests

describe('Errors cases', () => {

    it('Should return an error if visitor is not found', () => {

        const event = {
            email: 'incognito_guy@unknow.com'
        }
        expect(handleCheckin(event)).to.throw(Error('Visitor not found'))
    });

    it('Should return an error if company id does not match the company set for this visitor', () => {

        const event = {
            firstname: "Jon",
            lastname: "Snow",
            email: "jonsnow@thewall.com",
            companyId: 3
        }
        expect(handleCheckin(event)).to.throw(Error('Company ID Mismatch'))
    });
});

describe('Happy paths', () => {

    it('Should find the visitor, generate credentials and returns it', () => {

        const event = {
            firstname: "Daenerys",
            lastname: "Targaryen",
            email: "dtargaryen@braavos.com",
            companyId: 2
        }

        expect(handleCheckin(event)).to.deep.equals({
            username: 'dtargaryen',
            password: '76bd7564'
        })
    });

    it.only('Should store the credentials and not generate it twice', () => {
        const event = {
            email: "jonsnow@thewall.com",
            companyId: 1
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
