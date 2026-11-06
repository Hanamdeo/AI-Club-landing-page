/**
 * contentSelectors.js
 * Centralized selector functions, priority sorters, and filtering utilities.
 * Ensures consistent data flow to the UI and BDX-01 Autonomous Projector.
 */

import { EVENTS } from '@/data/events';
import { DISCUSSIONS } from '@/data/discussions';
import { AI_NEWS } from '@/data/aiNews';
import { PROJECTS } from '@/data/projects';
import { RESEARCH_TRACKS } from '@/data/research';
import { ANNOUNCEMENTS } from '@/data/announcements';
import { TEAM_MEMBERS } from '@/data/team';
import { CLUB_INFO } from '@/data/clubInfo';
import { isUpcoming, isPast, getNow } from './dateUtils';

/**
 * Resolve event status dynamically based on current date
 */
function resolveEventStatus(event) {
  if (event.status === 'cancelled') return 'cancelled';
  if (isPast(event.date)) return 'past';
  return 'upcoming';
}

/**
 * Resolve discussion status dynamically
 */
function resolveDiscussionStatus(gd) {
  if (isPast(gd.date)) return 'past';
  return 'upcoming';
}

/**
 * Get all events with dynamic statuses, sorted chronologically
 */
export function getAllEvents() {
  return EVENTS.map((ev) => ({
    ...ev,
    status: resolveEventStatus(ev),
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get upcoming events, prioritizing featured items first
 */
export function getUpcomingEvents() {
  return getAllEvents()
    .filter((ev) => ev.status === 'upcoming')
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
}

/**
 * Get past events
 */
export function getPastEvents() {
  return getAllEvents()
    .filter((ev) => ev.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all discussions with dynamic statuses
 */
export function getAllDiscussions() {
  return DISCUSSIONS.map((gd) => ({
    ...gd,
    status: resolveDiscussionStatus(gd),
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get upcoming discussions, featured first
 */
export function getUpcomingDiscussions() {
  return getAllDiscussions()
    .filter((gd) => gd.status === 'upcoming')
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
}

/**
 * Get past discussions
 */
export function getPastDiscussions() {
  return getAllDiscussions()
    .filter((gd) => gd.status === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get curated AI news, featured first, then newest
 */
export function getCuratedNews() {
  return [...AI_NEWS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get projects with featured items first
 */
export function getAllProjects() {
  return [...PROJECTS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

/**
 * Get active announcements (not expired)
 */
export function getActiveAnnouncements() {
  const now = getNow().getTime();
  return ANNOUNCEMENTS.filter((ann) => {
    if (ann.status === 'expired') return false;
    if (ann.expiresAt && new Date(ann.expiresAt).getTime() < now) return false;
    return true;
  }).sort((a, b) => {
    if (a.urgency === 'high' && b.urgency !== 'high') return -1;
    if (a.urgency !== 'high' && b.urgency === 'high') return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get team members grouped by category
 */
export function getTeamMembers() {
  return TEAM_MEMBERS;
}

/**
 * Centralized BDX-01 Autonomous Projector Payload Builder.
 * Returns contextual payload cards for the given mode with a strict limit (e.g. 3-4 items)
 * so as not to overwhelm visitors.
 *
 * @param {'EVENTS' | 'GD_SCHEDULE' | 'AI_NEWS' | 'RESEARCH_UPDATES' | 'ANNOUNCEMENTS' | 'FEATURED_PROJECTS' | 'RECRUITMENT'} mode
 * @param {number} maxItems
 */
export function getBdxProjectionPayload(mode, maxItems = 4) {
  switch (mode) {
    case 'EVENTS': {
      const upcoming = getUpcomingEvents();
      return {
        mode: 'EVENTS',
        title: 'OPERATIONAL FLIGHT BOARD',
        badge: 'Upcoming Events',
        items: upcoming.slice(0, maxItems).map((ev) => ({
          id: ev.id,
          title: ev.title,
          subtitle: `${ev.date} • ${ev.time}`,
          description: ev.description,
          detail: ev.venue,
          tag: ev.category,
          featured: ev.featured,
          actionLabel: 'Register',
          actionUrl: ev.registrationUrl,
        })),
        totalCount: upcoming.length,
      };
    }

    case 'GD_SCHEDULE': {
      const upcoming = getUpcomingDiscussions();
      return {
        mode: 'GD_SCHEDULE',
        title: 'DISCUSSION COHORTS',
        badge: 'Upcoming Sessions',
        items: upcoming.slice(0, maxItems).map((gd) => ({
          id: gd.id,
          title: gd.topic,
          subtitle: `${gd.date} • ${gd.time}`,
          description: gd.abstract,
          detail: `Moderator: ${gd.moderator}`,
          tag: gd.category,
          featured: gd.featured,
          actionLabel: 'Reserve Seat',
          actionUrl: gd.registrationUrl,
        })),
        totalCount: upcoming.length,
      };
    }

    case 'AI_NEWS': {
      const news = getCuratedNews();
      return {
        mode: 'AI_NEWS',
        title: 'RADAR DISPATCHES',
        badge: 'Curated Breakthroughs',
        items: news.slice(0, maxItems).map((item) => ({
          id: item.id,
          title: item.headline,
          subtitle: `${item.source} • ${item.date}`,
          description: item.summary,
          detail: `Category: ${item.category}`,
          tag: item.category,
          featured: item.featured,
          actionLabel: 'Read Source',
          actionUrl: item.url,
        })),
        totalCount: news.length,
      };
    }

    case 'FEATURED_PROJECTS': {
      const projects = getAllProjects();
      return {
        mode: 'FEATURED_PROJECTS',
        title: 'SYSTEMS ARCHIVE',
        badge: 'Production & Proofs',
        items: projects.slice(0, maxItems).map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.technologies.slice(0, 3).join(' • '),
          description: p.description,
          detail: p.benchmarks?.[0] ? `${p.benchmarks[0].metric}: ${p.benchmarks[0].value}` : p.status,
          tag: p.category,
          featured: p.featured,
          actionLabel: p.liveDemo ? 'Live Demo' : 'GitHub Repo',
          actionUrl: p.liveDemo || p.github,
        })),
        totalCount: projects.length,
      };
    }

    case 'RESEARCH_UPDATES': {
      return {
        mode: 'RESEARCH_UPDATES',
        title: 'LAB COGNITIVE TRACKS',
        badge: 'Core Research',
        items: RESEARCH_TRACKS.slice(0, maxItems).map((r) => ({
          id: r.id,
          title: r.title,
          subtitle: `Lead: ${r.lead}`,
          description: r.focus,
          detail: r.clusterAllocation,
          tag: 'Research',
          featured: true,
          actionLabel: 'Explore Lab',
          actionUrl: '#intelligence-core',
        })),
        totalCount: RESEARCH_TRACKS.length,
      };
    }

    case 'RECRUITMENT': {
      return {
        mode: 'RECRUITMENT',
        title: 'JOIN THE NETWORK',
        badge: 'Admissions Open',
        items: CLUB_INFO.domains.slice(0, maxItems).map((d) => ({
          id: d.id,
          title: d.name,
          subtitle: d.badge,
          description: d.description,
          detail: d.keywords.join(', '),
          tag: 'Domain',
          featured: true,
          actionLabel: 'Apply Now',
          actionUrl: '#join-network',
        })),
        totalCount: CLUB_INFO.domains.length,
      };
    }

    case 'ANNOUNCEMENTS':
    default: {
      const active = getActiveAnnouncements();
      return {
        mode: 'ANNOUNCEMENTS',
        title: 'FACILITY ANNOUNCEMENTS',
        badge: 'Active Bulletins',
        items: active.slice(0, maxItems).map((a) => ({
          id: a.id,
          title: a.title,
          subtitle: a.date,
          description: a.content,
          detail: `Priority: ${a.urgency.toUpperCase()}`,
          tag: a.urgency === 'high' ? 'High Priority' : 'Bulletin',
          featured: a.featured,
          actionLabel: a.actionText,
          actionUrl: a.actionLink,
        })),
        totalCount: active.length,
      };
    }
  }
}

