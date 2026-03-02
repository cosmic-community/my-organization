import Link from 'next/link';

interface HeroSectionProps {
  organizationName?: string;
  tagline?: string;
  missionStatement?: string;
}

export default function HeroSection({
  organizationName,
  tagline,
  missionStatement,
}: HeroSectionProps) {
  const displayName = organizationName || 'My Organization';
  const displayTagline = tagline || 'Making a difference in our community';
  const displayMission =
    missionStatement ||
    'We are dedicated to creating meaningful change through our programs, events, and dedicated team members. Join us in making the world a better place.';

  return (
    <section className="relative overflow-hidden gradient-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative container-wide py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-primary-100 backdrop-blur-sm mb-8">
            <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
            {displayTagline}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Welcome to{' '}
            <span className="text-accent-300">{displayName}</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-lg text-primary-100 leading-relaxed sm:text-xl max-w-2xl mx-auto mb-10">
            {displayMission}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 shadow-lg hover:bg-primary-50 hover:shadow-xl transition-all duration-300"
            >
              Explore Programs
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80h1440V40c-240 30-480 40-720 20S240 20 0 50v30z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}