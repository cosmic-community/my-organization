import { createBucketClient } from '@cosmicjs/sdk';
import type {
  SiteSettings,
  Program,
  CosmicEvent,
  ImpactStory,
  TeamMember,
} from '@/types';
import { hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

// --- Site Settings ---
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'site-settings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    const settings = response.objects[0] as SiteSettings | undefined;
    return settings ?? null;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// --- Programs ---
export async function getPrograms(): Promise<Program[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'programs' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.objects as Program[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching programs:', error);
    return [];
  }
}

export async function getProgram(slug: string): Promise<Program | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'programs', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.object as Program;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching program:', error);
    return null;
  }
}

// --- Events ---
export async function getEvents(): Promise<CosmicEvent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    const events = response.objects as CosmicEvent[];

    // Sort by event date (upcoming first)
    return events.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || a.created_at).getTime();
      const dateB = new Date(b.metadata?.date || b.created_at).getTime();
      return dateA - dateB;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getEvent(slug: string): Promise<CosmicEvent | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.object as CosmicEvent;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching event:', error);
    return null;
  }
}

// --- Impact Stories ---
export async function getImpactStories(): Promise<ImpactStory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'impact-stories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.objects as ImpactStory[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching impact stories:', error);
    return [];
  }
}

export async function getImpactStory(slug: string): Promise<ImpactStory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'impact-stories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.object as ImpactStory;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching impact story:', error);
    return null;
  }
}

// --- Team Members ---
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);

    return response.objects as TeamMember[];
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching team members:', error);
    return [];
  }
}