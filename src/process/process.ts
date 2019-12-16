import { IVisitor as IVisitorEvent } from "../proxyclick/visitors";

/**
 * In response of a check-in event, returns a WiFi credentials object
 * @param visitor the visitor object checking in
 * @returns a credentials object, containing the credentials for this visitor
 */
export async function handleCheckin(visitor: Partial<IVisitorEvent>) {

    // TODO: Write the body of this function
    // This function should returns a ICredentials object
}