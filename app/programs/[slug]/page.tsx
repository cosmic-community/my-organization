// app/programs/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProgram, getPrograms } from '@/lib/cosmic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: 'Program Not Found' };

  return {
    title: `${program.title} | My Organization`,
    description: program.metadata?.description?.substring(0, 160) || '',
  };
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export const revalidate = 60;

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgram(slug);

  if (!program) {
    notFound();
  }

  const image = program.metadata?.featured_image;
  const status = program.metadata?.status;
  const description = program.metadata?.description;

  return (
    <div className="section-padding bg-white">
      <div className="container-wide">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li>
              <Link href="/programs" className="hover:text-primary-600 transition-colors">
                Programs
              </Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-gray-600 font-medium">{program.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          {/* Image */}
          {image?.imgix_url && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-10">
              <img
                src={`${image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                alt={program.title}
                width={700}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Title & Status */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {program.title}
            </h1>
            {status && (
              <span
                className={`badge ${
                  status.toLowerCase() === 'active'
                    ? 'badge-active'
                    : status.toLowerCase() === 'upcoming'
                    ? 'badge-upcoming'
                    : 'badge-inactive'
                }`}
              >
                {status}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p>{description}</p>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}