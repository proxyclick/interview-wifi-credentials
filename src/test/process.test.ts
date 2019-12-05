import { handleCheckin } from "../process/process"
import { expect } from "chai"
import { CredentialsService } from "../proxyclick/credentials";
import * as sinon from 'sinon';
import { VisitorsService } from "../proxyclick/visitors";

// Do not modify this file
// TODO: Make sure all the test cases pass. 
// Read carefully the description of the tests

describe('Search function', () => {

    it('Should returns all the visitors with the same lastname', () => {

        expect(VisitorsService.getVisitors({
            lastname: 'Lannister'
        })).to.deep.equals([{
            firstname: "Tyrion",
            lastname: "Lannister",
            email: "tyrion@lannister.com",
            companyId: 4
        },
            ,
        {
            firstname: "Cersei",
            lastname: "Lannister",
            email: "cersei@lannister.com",
            companyId: 4
        },
        {
            firstname: "Jaime",
            lastname: "Lannister",
            email: "jaime@lannister.com",
            companyId: 4
        },
        {
            firstname: "Tywin",
            lastname: "Lannister",
            email: "tywin@lannister.com",
            companyId: 4
        }])
    });
})

describe('Errors cases', () => {

    it('Should return an error if visitor is not found', () => {

        const event = {
            email: 'incognito_guy@unknow.com'
        }
        expect(() => handleCheckin(event)).to.throw('Visitor not found');
    });

    it('Should return an error if company id does not match the company set for this visitor', () => {

        const event = {
            firstname: "Jon",
            lastname: "Snow",
            email: "jonsnow@thewall.com",
            companyId: 3
        }
        expect(() => handleCheckin(event)).to.throw('Company ID Mismatch')
    });
});

describe('Happy paths', () => {

    it('Should find the visitor, generate credentials and returns it', () => {

        const event = {
            firstname: "Daenerys",
            lastname: "Targaryen",
            email: "dtargaryan@braavos.com",
            companyId: 2
        }

        expect(handleCheckin(event)).to.deep.equals({
            username: 'dtargaryen',
            password: '76bd7564'
        })
    });

    it('Should find the visitor, identify a mismatch, and update it', () => {
        const event = {
            firstname: "Updated",
            lastname: "Guy",
            email: "kdrogo@doth.raki",
            companyId: 5
        }
        const spy = sinon.spy(VisitorsService, 'updateVisitor');
        expect(handleCheckin(event)).to.deep.equals({
            username: 'uguy',
            password: '4d323850'
        })

        expect(spy.calledWith('kdrogo@doth.raki', {
            firstname: "Updated",
            lastname: "Guy"
        })).to.be.true;
    })


    it('Should store the credentials and not generate it twice', () => {
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
