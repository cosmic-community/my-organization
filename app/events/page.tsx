import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import EventCard from '@/components/EventCard';
import { getEvents } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Events | My Organization',
  description: 'Browse our upcoming events and find opportunities to get involved.',
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="section-padding gradient-warm">
      <div className="container-wide">
        <SectionHeading
          title="Events"
          subtitle="Stay up to date with everything happening at our organization. From community gatherings to workshops, there's something for everyone."
        />

        {events.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <p className="mt-4 text-gray-500">No events scheduled yet. Check back soon!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}