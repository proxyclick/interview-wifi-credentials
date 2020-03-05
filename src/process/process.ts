import { VisitorsService, IVisitor as IVisitorEvent } from "../proxyclick/visitors";
import { CredentialsService } from "../proxyclick/credentials";

async function updateVisitorNameIfMismatch(visitorEvent: Partial<IVisitorEvent>, visitorFound: Partial<IVisitorEvent>) {
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
 */
export async function handleCheckin(visitorEvent: Partial<IVisitorEvent>) {
  const { email } = visitorEvent;

  const visitors = await VisitorsService.getVisitors({ email });

  if (visitors.length === 0) {
    throw new Error(`User with email "${email}" not found`);
  }

  const [visitor] = visitors;

  const { firstname, lastname } = await updateVisitorNameIfMismatch(visitorEvent, visitor);

  return CredentialsService.generate(firstname, lastname, email);
}