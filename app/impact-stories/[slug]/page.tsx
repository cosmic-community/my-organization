// app/impact-stories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getImpactStory, getImpactStories } from '@/lib/cosmic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getImpactStory(slug);
  if (!story) return { title: 'Story Not Found' };

  const personName = story.metadata?.person_name || 'Community Member';
  return {
    title: `${story.title} — ${personName} | My Organization`,
    description: story.metadata?.quote?.substring(0, 160) || '',
  };
}

export async function generateStaticParams() {
  const stories = await getImpactStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export const revalidate = 60;

export default async function ImpactStoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getImpactStory(slug);

  if (!story) {
    notFound();
  }

  const photo = story.metadata?.photo;
  const personName = story.metadata?.person_name || 'Community Member';
  const quote = story.metadata?.quote;
  const storyContent = story.metadata?.story;
  const program = story.metadata?.program;

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
              <Link href="/impact-stories" className="hover:text-primary-600 transition-colors">Impact Stories</Link>
            </li>
            <li>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-gray-600 font-medium">{story.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mx-auto">
          {/* Person Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-4 ring-4 ring-primary-100">
              {photo?.imgix_url ? (
                <img
                  src={`${photo.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                  alt={personName}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-200 to-accent-300">
                  <span className="text-2xl font-bold text-accent-700">{personName.charAt(0)}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
              {story.title}
            </h1>
            <p className="text-lg font-medium text-primary-600 mb-1">{personName}</p>
            {program && (
              <Link
                href={`/programs/${program.slug}`}
                className="text-sm text-gray-400 hover:text-primary-500 transition-colors"
              >
                {program.title}
              </Link>
            )}
          </div>

          {/* Quote */}
          {quote && (
            <blockquote className="relative bg-primary-50 rounded-2xl p-8 mb-10">
              <svg className="absolute top-4 left-4 h-8 w-8 text-primary-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>
              <p className="relative text-lg text-primary-800 italic leading-relaxed pl-10">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          )}

          {/* Story */}
          {storyContent && (
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p>{storyContent}</p>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/impact-stories"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to all stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}