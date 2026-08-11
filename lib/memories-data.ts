import { ProposalSettings, Memory, MapLocation, GuestbookWish, RelationshipStats } from './types';

export const DEFAULT_PROPOSAL_SETTINGS: ProposalSettings = {
  recipientName: 'Sarah',
  proposerName: 'Ahmad',
  heroHeadline: 'Every Moment Led Us Here...',
  heroSubheadline: 'A journey through our love story, designed with every heartbeat.',
  loveLetterText: `Meri Pyari Sarah,

Jab se tum meri zindagi main aayi ho, har din aik khoobsurat khwab jaisa lagta hai. Tumhari muskurahat meri duniya ki sabse haseen roshni hai, aur tumhara saath meri rooh ka sukoon... 🌸✨

Suno, kya tum Google ho? Kyun ke jo kuch bhi main zindagi main dhoond raha tha, wo sab mujhe tum main mil gaya! 🙈💖

Tumhare bina chaand bhi adhoora lagta hai aur ye hawayein bhi khaamosh. Main har pal tumhare saath bitana chahta hoon, kyun ke tum meri pehli aur aakhri khwahish ho.

Hamesha sirf Tumhara,
Ahmad ❤️`,
  proposalQuestion: 'Do You Love Me?',
  proposalSubtext: 'Sachi sachi batao, kitna pyaar karti ho Sarah mujhse?',
  secretMessage: 'You found the secret vault! Here is a lifetime pass of infinite morning coffees & massage vouchers!',
  secretVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-walking-on-the-beach-at-sunset-41551-large.mp4',
  backgroundMusicUrl: '/Pehli Dafa  Atif Aslam (Karaoke Version).mp3',
};

export const DEFAULT_STATS: RelationshipStats = {
  startDate: '2021-04-12',
  recipientName: 'Sarah',
  proposerName: 'Ahmad',
  tripsTogetherCount: 8,
  tripsCount: 8,
  memoriesCount: 42,
  coffeeDatesCount: 150,
  secretPasscode: '1204',
};

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    date: '2021-04-12',
    title: 'The First Hello',
    description: 'Under the warm rain of April, our eyes met for the very first time. I knew right then that everything was about to change.',
    imageUrl: '/sakura-dream-girl-stockcake.jpg',
    category: 'milestone',
  },
  {
    id: '2',
    date: '2022-02-14',
    title: 'Sunset Beach Walk',
    description: 'We walked along the shoreline until the stars came out, listening to the gentle crash of waves.',
    imageUrl: '/cherry-blossom-girl-stockcake.jpg',
    category: 'trip',
  },
  {
    id: '3',
    date: '2023-08-20',
    title: 'Stargazing Mountain Trip',
    description: 'Wrapped in a shared blanket under the Milky Way, whispering our biggest dreams to the night sky.',
    imageUrl: '/watercolor-anime-girl-stockcake.jpg',
    category: 'trip',
  },
];

export const INITIAL_LOCATIONS: MapLocation[] = [
  {
    id: 'loc1',
    name: 'Coffee Shop Where We Met',
    lat: 31.5204,
    lng: 74.3587,
    memorySnippet: 'Our very first coffee date that lasted 4 hours without noticing the time.',
  },
  {
    id: 'loc2',
    name: 'Our Favorite Beach',
    lat: 24.8607,
    lng: 67.0011,
    memorySnippet: 'Where we watched the red sunset and shared our deepest secrets.',
  },
];

export const INITIAL_GUESTBOOK: GuestbookWish[] = [
  {
    id: 'w1',
    name: 'Ahmad',
    message: 'To the love of my life Sarah, forever begins right now! ❤️✨',
    createdAt: '2026-08-11T12:00:00Z',
  },
];
