import { IVisitor as IVisitorEvent } from "../proxyclick/visitors";

/**
 * In response of a check-in event, returns a WiFi credentials object
 * @param visitorEvent the visitor event checking in
 * @returns a credentials object, containing the credentials for this visitor
 */
export async function handleCheckin(visitorEvent: Partial<IVisitorEvent>) {

    // TODO: Write the body of this function
    // This function should returns a ICredentials object
}