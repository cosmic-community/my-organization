import Link from 'next/link';
import type { Program } from '@/types';

interface ProgramCardProps {
  program: Program;
}

function getStatusBadge(status?: string): { className: string; label: string } {
  const normalized = (status || '').toLowerCase();
  if (normalized === 'active') {
    return { className: 'badge badge-active', label: 'Active' };
  }
  if (normalized === 'upcoming') {
    return { className: 'badge badge-upcoming', label: 'Upcoming' };
  }
  return { className: 'badge badge-inactive', label: status || 'Inactive' };
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const image = program.metadata?.featured_image;
  const status = getStatusBadge(program.metadata?.status);
  const description = program.metadata?.description || '';
  const truncatedDescription =
    description.length > 150 ? description.substring(0, 150) + '...' : description;

  return (
    <Link
      href={`/programs/${program.slug}`}
      className="group block rounded-2xl bg-white border border-gray-100 overflow-hidden card-hover shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={program.title}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center gradient-primary">
            <svg className="h-12 w-12 text-white/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={status.className}>{status.label}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
          {program.title}
        </h3>
        {truncatedDescription && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {truncatedDescription}
          </p>
        )}
        <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
          Learn more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}