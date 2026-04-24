export const profile = {
  name: 'Alex Huaracha',
  initials: 'AH',
  handle: '@alexhuaracha',
  role: 'Software Engineer',

  location: 'Arequipa, PE',
  timezone: 'America/Lima',
  timezoneOffset: -5,
  pronouns: 'he/him',
  email: 'alexhuarachaq@gmail.com',
  phone: '+51 962 334 712',
  website: 'alexhuaracha.dev',

  socials: [
    {
      label: 'GitHub',
      icon: 'simple-icons:github',
      href: 'https://github.com/alex-huaracha',
    },
    {
      label: 'LinkedIn',
      icon: 'simple-icons:linkedin',
      href: 'https://www.linkedin.com/in/alex-huaracha',
    },
    {
      label: 'X',
      icon: 'simple-icons:x',
      href: 'https://x.com/alexhuaracha',
    },
  ],

  statuses: [
    'Software Developer',
    'Creating with code. Small details matter.',
    'Open Source Contributor',
  ],
} as const;
