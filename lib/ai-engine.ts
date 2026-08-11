import { Memory, ProposalSettings, RelationshipStats } from './types';

export function queryAIMemory(
  userQuery: string,
  memories: Memory[],
  settings: ProposalSettings,
  stats: RelationshipStats
): string {
  const query = userQuery.toLowerCase().trim();

  if (!query) {
    return `Hello! I am Cupid, your AI Love Assistant. Ask me anything about ${settings.recipientName} and ${settings.proposerName}'s magical memories together! ✨`;
  }

  // First date / Meet queries
  if (query.includes('first meet') || query.includes('first date') || query.includes('how we met') || query.includes('coffee') || query.includes('start')) {
    const firstMemory = memories.find(m => m.category === 'firsts') || memories[0];
    return `Awh! You first met at ${firstMemory.location} on ${firstMemory.date}. ${firstMemory.description} ☕💖`;
  }

  // Proposal / Marry queries
  if (query.includes('marry') || query.includes('proposal') || query.includes('future') || query.includes('forever')) {
    return `${settings.proposerName} built this entire website to ask ${settings.recipientName} one life-changing question: "${settings.proposalQuestion}"! Every single memory is a testament to how deeply loved you are! 💍✨`;
  }

  // Days together / How long
  if (query.includes('how long') || query.includes('days') || query.includes('anniversary') || query.includes('time')) {
    const start = new Date(stats.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `You two have been together for over ${diffDays} glorious days (${stats.tripsTogetherCount} trips, ${stats.coffeeDatesCount} coffee dates, and counting)! 🥰`;
  }

  // Trip / Travel / Vacation
  if (query.includes('trip') || query.includes('travel') || query.includes('vacation') || query.includes('beach') || query.includes('mountain')) {
    const travelMemories = memories.filter(m => m.category === 'travel');
    if (travelMemories.length > 0) {
      const randomTrip = travelMemories[Math.floor(Math.random() * travelMemories.length)];
      return `One of your most magical getaways was "${randomTrip.title}" at ${randomTrip.location} on ${randomTrip.date}! ${randomTrip.description} ✈️🌊`;
    }
  }

  // Favorite / Love / Why
  if (query.includes('love') || query.includes('why') || query.includes('favorite') || query.includes('special')) {
    return `${settings.proposerName} loves your contagious laugh, your kind soul, and the quiet comfort of just holding hands. You make every ordinary day feel like an extraordinary fairytale! 🌹`;
  }

  // Secret / Password
  if (query.includes('secret') || query.includes('password') || query.includes('passcode') || query.includes('lock')) {
    return `Psst! The secret vault passcode is ${stats.secretPasscode}! Enter it in the Surprise Vault section to unlock your secret video and gift vouchers! 🔒🎁`;
  }

  // Generic fallback with romantic context
  const randomMem = memories[Math.floor(Math.random() * memories.length)];
  return `That reminds me of "${randomMem.title}" on ${randomMem.date}! ${randomMem.description} Feel free to ask me about your trips, first date, or anniversary count! 💕`;
}
