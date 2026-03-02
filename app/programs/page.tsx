import type { Metadata } from 'next';
import SectionHeading from '@/components/SectionHeading';
import ProgramCard from '@/components/ProgramCard';
import { getPrograms } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'Programs | My Organization',
  description: 'Explore all the programs we offer to make an impact in our community.',
};

export const revalidate = 60;

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div className="section-padding bg-white">
      <div className="container-wide">
        {/* Page Header */}
        <div className="mb-4">
          <SectionHeading
            title="Our Programs"
            subtitle="Explore the full range of initiatives that drive our mission. Each program is designed to create meaningful, lasting change."
          />
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <p className="mt-4 text-gray-500">No programs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}