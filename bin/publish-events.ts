import { prisma } from '../app/lib/db';
import fs from 'fs';

const events = JSON.parse(fs.readFileSync('events.json', 'utf8'));

for (const event of events) {
  await prisma.event.upsert({
    where: {
      title_date: {
        title: event.title,
        date: event.date,
      },
    },
    update: event,
    create: event,
  });
}
