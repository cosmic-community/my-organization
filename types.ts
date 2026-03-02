// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Cosmic media file
export interface CosmicMedia {
  url: string;
  imgix_url: string;
}

// Site Settings
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    organization_name?: string;
    tagline?: string;
    mission_statement?: string;
    logo?: CosmicMedia;
  };
}

// Programs
export type ProgramStatus = 'Active' | 'Inactive' | 'Upcoming' | 'active' | 'inactive' | 'upcoming';

export interface Program extends CosmicObject {
  type: 'programs';
  metadata: {
    description?: string;
    featured_image?: CosmicMedia;
    status?: string;
  };
}

// Events
export interface CosmicEvent extends CosmicObject {
  type: 'events';
  metadata: {
    date?: string;
    location?: string;
    description?: string;
    featured_image?: CosmicMedia;
    registration_link?: string;
  };
}

// Impact Stories
export interface ImpactStory extends CosmicObject {
  type: 'impact-stories';
  metadata: {
    person_name?: string;
    quote?: string;
    story?: string;
    photo?: CosmicMedia;
    program?: Program;
  };
}

// Team Members
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    role?: string;
    bio?: string;
    photo?: CosmicMedia;
    email?: string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Helper type guard
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export { hasStatus };