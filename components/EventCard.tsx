import Link from 'next/link';
import type { CosmicEvent } from '@/types';

interface EventCardProps {
  event: CosmicEvent;
}

function formatDate(dateString?: string): { month: string; day: string; full: string } {
  if (!dateString) {
    return { month: 'TBD', day: '--', full: 'Date TBD' };
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { month: 'TBD', day: '--', full: 'Date TBD' };
  }
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate().toString(),
    full: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}

export default function EventCard({ event }: EventCardProps) {
  const date = formatDate(event.metadata?.date);
  const image = event.metadata?.featured_image;
  const description = event.metadata?.description || '';
  const truncatedDescription =
    description.length > 120 ? description.substring(0, 120) + '...' : description;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col sm:flex-row rounded-2xl bg-white border border-gray-100 overflow-hidden card-hover shadow-sm"
    >
      {/* Date Badge (Desktop) */}
      <div className="hidden sm:flex flex-col items-center justify-center w-28 shrink-0 bg-primary-50 p-4">
        <span className="text-xs font-bold text-primary-600 tracking-wider">
          {date.month}
        </span>
        <span className="text-3xl font-extrabold text-primary-900">
          {date.day}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] sm:aspect-auto sm:w-48 shrink-0 overflow-hidden bg-gray-100">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
            alt={event.title}
            width={200}
            height={150}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-100 to-accent-200">
            <svg className="h-10 w-10 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
        )}
        {/* Mobile Date Badge */}
        <div className="absolute top-3 left-3 sm:hidden bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-sm">
          <span className="block text-xs font-bold text-primary-600">{date.month}</span>
          <span className="block text-lg font-extrabold text-primary-900 leading-tight">{date.day}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
          {event.title}
        </h3>
        {event.metadata?.location && (
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {event.metadata.location}
          </div>
        )}
        {truncatedDescription && (
          <p className="text-sm text-gray-500 leading-relaxed">{truncatedDescription}</p>
        )}
        <p className="mt-3 text-xs text-gray-400">{date.full}</p>
      </div>
    </Link>
  );
}