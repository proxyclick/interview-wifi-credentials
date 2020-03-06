import { VisitorsService, IVisitor as IVisitorEvent, IVisitorResult } from "../proxyclick/visitors";
import { CredentialsService } from "../proxyclick/credentials";
import cache from './cache';

/**
 * Updates a Visitor if the event's first or last name mismatch fetced data
 * @param visitorEvent the visitor event checking in
 * @param visitorFound the visitor fetched from the API
 * @returns the possibly updated Visitor
 */
async function updateVisitorNameIfMismatch(
  visitorEvent: Partial<IVisitorEvent>,
  visitorFound: IVisitorResult
): Promise<IVisitorResult> {
  const isEqual = ['firstname', 'lastname'].every(key => {
    if (key in visitorEvent) {
      return visitorEvent[key] === visitorFound[key];
    }

    return true;
  });

  if (isEqual) {
    return visitorFound;
  }

  const { firstname, lastname } = visitorEvent;

  VisitorsService.updateVisitor(visitorFound.email, { firstname, lastname });

  return { ...visitorFound, firstname, lastname };
}

/**
 * In response of a check-in event, returns a WiFi credentials object
 * @param visitorEvent the visitor event checking in
 * @returns a credentials object, containing the credentials for this visitor
 * @throws Will throw an Error if no Visitor is found
 */
export async function handleCheckin(visitorEvent: Partial<IVisitorEvent>) {
  const { email } = visitorEvent;

  const visitors = await VisitorsService.getVisitors({ email });

  if (visitors.length === 0) {
    throw new Error(`User with email "${email}" not found`);
  }

  /*
   * Assuming the backend DB is consistent and does not allow two visitors to
   * have the same email, the visitor we're looking for is the first and only
   * element of the lookup results.
   */
  const [visitor] = visitors;

  const { firstname, lastname } = await updateVisitorNameIfMismatch(visitorEvent, visitor);

  if (cache.has(email)) {
    return cache.get(email)
  }

  const credentials = CredentialsService.generate(firstname, lastname, email);

  cache.set(email, credentials);

  return credentials;
}