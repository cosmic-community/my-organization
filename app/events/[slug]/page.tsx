// app/events/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEvent, getEvents } from '@/lib/cosmic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: 'Event Not Found' };

  return {
    title: `${event.title} | My Organization`,
    description: event.metadata?.description?.substring(0, 160) || '',
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export const revalidate = 60;

function formatEventDate(dateString?: string): string {
  if (!dateString) return 'Date TBD';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Date TBD';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const image = event.metadata?.featured_image;
  const date = formatEventDate(event.metadata?.date);
  const location = event.metadata?.location;
  const description = event.metadata?.description;
  const registrationLink = event.metadata?.registration_link;

  return (
    <div className="section-padding bg-white">
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li>
              <Link href="/events" className="hover:text-primary-600 transition-colors">Events</Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-gray-600 font-medium">{event.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Image */}
          {image?.imgix_url && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10">
              <img
                src={`${image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                alt={event.title}
                width={700}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            {event.title}
          </h1>

          {/* Event Meta */}
          <div className="flex flex-wrap gap-6 mb-8 p-6 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Date</p>
                <p className="text-sm font-semibold text-gray-900">{date}</p>
              </div>
            </div>

            {location && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100">
                  <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-10">
              <p>{description}</p>
            </div>
          )}

          {/* Registration Link */}
          {registrationLink && (
            <div className="mb-10">
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-300"
              >
                Register for this Event
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          )}

          {/* Back Link */}
          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}