import Link from 'next/link';
import type { ImpactStory } from '@/types';

interface StoryCardProps {
  story: ImpactStory;
}

export default function StoryCard({ story }: StoryCardProps) {
  const photo = story.metadata?.photo;
  const personName = story.metadata?.person_name || 'Community Member';
  const quote = story.metadata?.quote || '';
  const program = story.metadata?.program;
  const truncatedQuote =
    quote.length > 160 ? quote.substring(0, 160) + '...' : quote;

  return (
    <Link
      href={`/impact-stories/${story.slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden card-hover shadow-sm"
    >
      <div className="p-6">
        {/* Quote Icon */}
        <div className="mb-4">
          <svg className="h-8 w-8 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
          </svg>
        </div>

        {/* Quote */}
        {truncatedQuote && (
          <p className="text-gray-600 leading-relaxed italic mb-6">
            &ldquo;{truncatedQuote}&rdquo;
          </p>
        )}

        {/* Person Info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
            {photo?.imgix_url ? (
              <img
                src={`${photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={personName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-200 to-accent-300">
                <span className="text-sm font-bold text-accent-700">
                  {personName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{personName}</p>
            {program && (
              <p className="text-xs text-primary-500">{program.title}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}