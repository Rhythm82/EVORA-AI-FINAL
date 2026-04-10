export const isTimeConflict = (existingEvents, newEvent) => {

  const newStart = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
  const newEnd = new Date(`${newEvent.endDate}T${newEvent.endTime}`);

  for (const event of existingEvents) {

    const existingStart = new Date(`${event.startDate}T${event.startTime}`);
    const existingEnd = new Date(`${event.endDate}T${event.endTime}`);

    if (existingStart < newEnd && existingEnd > newStart) {
      return event;
    }

  }

  return null;

};