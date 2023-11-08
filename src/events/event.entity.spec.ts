import { Event } from "./event.entity";

test('event should be initialized through construstor',()=>{
    const event = new Event({
        name :'interesting event',
        description: 'that was fun'
    });
  expect(event).toEqual(
    {
        name :'interesting event',
        description: 'that was fun',
        id: undefined,
        when: undefined,
        address: undefined,
        attendees: undefined,
        organizer: undefined,
        organizerId: undefined,
        event: undefined,
        attendeeCount: undefined,
        attendeeRejected: undefined,
        attendeeMaybe: undefined,
        attendeeAccepted: undefined,
    }
  )
})