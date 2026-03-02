import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import StoryCard from '@/components/StoryCard';
import { getImpactStories } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Impact Stories | My Organization',
  description: 'Read inspiring stories from the people whose lives have been touched by our programs.',
};

export const revalidate = 60;

export default async function ImpactStoriesPage() {
  const stories = await getImpactStories();

  return (
    <div className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeading
          title="Impact Stories"
          subtitle="Every person has a story. These are the stories of lives transformed through our programs and the dedication of our community."
        />

        {stories.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <p className="mt-4 text-gray-500">No stories shared yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}