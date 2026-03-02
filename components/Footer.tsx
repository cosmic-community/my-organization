import Link from 'next/link';

interface FooterProps {
  organizationName?: string;
}

export default function Footer({ organizationName }: FooterProps) {
  const displayName = organizationName || 'My Organization';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <span className="text-lg font-bold text-white">
                  {displayName.charAt(0)}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {displayName}
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Making a difference in our community, one step at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/programs', label: 'Programs' },
                { href: '/events', label: 'Events' },
                { href: '/impact-stories', label: 'Impact Stories' },
                { href: '/team', label: 'Our Team' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                  Our Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Want to learn more? Reach out to our team to find out how you can help.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} {displayName}. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}