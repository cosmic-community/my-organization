import type { TeamMember } from '@/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const photo = member.metadata?.photo;
  const role = member.metadata?.role || '';
  const bio = member.metadata?.bio || '';
  const email = member.metadata?.email;
  const truncatedBio =
    bio.length > 120 ? bio.substring(0, 120) + '...' : bio;

  return (
    <div className="group rounded-2xl bg-white border border-gray-100 overflow-hidden card-hover shadow-sm text-center">
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {photo?.imgix_url ? (
          <img
            src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={member.title}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
            <span className="text-5xl font-bold text-primary-400">
              {member.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{member.title}</h3>
        {role && (
          <p className="text-sm font-medium text-primary-600 mb-3">{role}</p>
        )}
        {truncatedBio && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {truncatedBio}
          </p>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-600 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {email}
          </a>
        )}
      </div>
    </div>
  );
}