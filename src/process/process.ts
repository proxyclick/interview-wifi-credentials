import { IVisitor as IVisitorEvent, VisitorsService } from "../proxyclick/visitors";
import { CredentialsService, ICredentials } from "../proxyclick/credentials";

const cachedCredentials: { [email: string]: ICredentials } = {};

/**
 * In response of a check-in event, returns a WiFi credentials object
 * @param visitorEvent the visitor event checking in
 * @returns a credentials object, containing the credentials for this visitor
 */
export async function handleCheckin(visitorEvent: Partial<IVisitorEvent>): Promise<ICredentials> {

    const { email, firstname, lastname } = visitorEvent;
    const visitors = await VisitorsService.getVisitors({ email });

    if (visitors.length === 0) {
        throw new Error('Visitor not found.')
    } else if (visitors.length > 1) {
        throw new Error('There is more than 1 visitor with this email address.')
    }

    const visitor = visitors[0];

    if (firstname && visitor.firstname !== firstname || lastname && visitor.lastname !== lastname) {
        VisitorsService.updateVisitor(email, { firstname, lastname });
        return generateAndCacheCredentials(firstname, lastname, email)
    }
    return cachedCredentials[email] || generateAndCacheCredentials(visitor.firstname, visitor.lastname, email);
}

function generateAndCacheCredentials(firstname: string, lastname: string, email: string): ICredentials {
    const credentials = CredentialsService.generate(firstname, lastname, email);
    cachedCredentials[email] = credentials;
    return credentials
}
