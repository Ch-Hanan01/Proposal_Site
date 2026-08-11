import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'A Romantic Proposal Site',
    short_name: 'ProposalSite',
    description: 'A luxury romantic proposal experience and love story journey.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0414',
    theme_color: '#0d0414',
    icons: [
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=192&h=192&q=80',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=512&h=512&q=80',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
