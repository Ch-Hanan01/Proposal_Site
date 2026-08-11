export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'firsts' | 'travel' | 'milestones' | 'dates';
  description: string;
  imageUrl: string;
  caption?: string;
}

export interface MapLocation {
  id: string;
  title: string;
  description: string;
  latitude: number; // 0 to 100 on custom SVG/canvas map or lat/lng
  longitude: number;
  date: string;
  imageUrl: string;
}

export interface GuestbookWish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  heartColor?: string;
}

export interface RelationshipStats {
  startDate: string; // ISO date string e.g. "2021-04-12"
  recipientName?: string;
  proposerName?: string;
  tripsTogetherCount?: number;
  tripsCount?: number;
  memoriesCount: number;
  coffeeDatesCount?: number;
  secretPasscode: string;
}

export interface ProposalSettings {
  recipientName: string;
  proposerName: string;
  heroHeadline: string;
  heroSubheadline: string;
  loveLetterText: string;
  proposalQuestion: string;
  proposalSubtext: string;
  backgroundMusicUrl: string;
  secretVideoUrl: string;
  secretMessage: string;
}
