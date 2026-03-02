import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import ProgramCard from '@/components/ProgramCard';
import EventCard from '@/components/EventCard';
import StoryCard from '@/components/StoryCard';
import TeamMemberCard from '@/components/TeamMemberCard';
import {
  getSiteSettings,
  getPrograms,
  getEvents,
  getImpactStories,
  getTeamMembers,
} from '@/lib/cosmic';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, programs, events, stories, teamMembers] = await Promise.all([
    getSiteSettings(),
    getPrograms(),
    getEvents(),
    getImpactStories(),
    getTeamMembers(),
  ]);

  const featuredPrograms = programs.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const featuredStories = stories.slice(0, 3);
  const featuredTeam = teamMembers.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <HeroSection
        organizationName={settings?.metadata?.organization_name}
        tagline={settings?.metadata?.tagline}
        missionStatement={settings?.metadata?.mission_statement}
      />

      {/* Programs Section */}
      {featuredPrograms.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <SectionHeading
              title="Our Programs"
              subtitle="Discover the initiatives driving our mission forward and making a lasting impact."
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
            {programs.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                >
                  View All Programs
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding gradient-warm">
          <div className="container-wide">
            <SectionHeading
              title="Upcoming Events"
              subtitle="Join us at our upcoming events and become a part of the change."
            />
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {events.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                >
                  View All Events
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Impact Stories Section */}
      {featuredStories.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <SectionHeading
              title="Impact Stories"
              subtitle="Real stories from real people whose lives have been touched by our work."
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
            {stories.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  href="/impact-stories"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                >
                  Read More Stories
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Team Section */}
      {featuredTeam.length > 0 && (
        <section className="section-padding gradient-warm">
          <div className="container-wide">
            <SectionHeading
              title="Meet Our Team"
              subtitle="The dedicated individuals who make our mission possible every day."
            />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
            {teamMembers.length > 4 && (
              <div className="mt-12 text-center">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-200 px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50 hover:border-primary-300 transition-all duration-300"
                >
                  Meet the Full Team
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="gradient-primary section-padding">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Get involved with our programs and events. Together, we can create lasting change in our community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-lg hover:bg-primary-50 transition-all duration-300"
            >
              Explore Programs
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}