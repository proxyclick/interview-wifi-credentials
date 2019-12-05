import { visitors } from "../../data/visitors"

// Do not modify this file

export interface IVisitor {
    firstname: string,
    lastname: string,
    email: string,
    companyId: number
}

export function getVisitors(filter: {
    firstname?: string,
    lastname?: string,
    email?: string
}) {
    return visitors.filter(v => {
        return (!v.email || v.email === filter.email) &&
            (!v.firstname || v.firstname === filter.firstname) &&
            (!v.lastname || v.lastname === filter.lastname)
    })
}