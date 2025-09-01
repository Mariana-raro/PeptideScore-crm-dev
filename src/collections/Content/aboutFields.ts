import { Field } from 'payload'

export const aboutFields: Field[] = [
  {
    name: 'missionStatement',
    type: 'textarea',
    maxLength: 1000,
    admin: {
      condition: (data) => data.pageType === 'about',
      description: 'Main mission statement for the about page',
    },
  },
  {
    name: 'values',
    type: 'array',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
    ],
    admin: {
      condition: (data) => data.pageType === 'about',
    },
  },
  {
    name: 'approach',
    type: 'richText',
    admin: {
      condition: (data) => data.pageType === 'about',
      description: 'Use bold, italics, and other formatting options',
    },
  },
  {
    name: 'teamMembers',
    type: 'array',
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'role', type: 'text', required: true },
      { name: 'bio', type: 'textarea' },
      { name: 'image', type: 'upload', relationTo: 'media' },
      {
        name: 'linkedin',
        type: 'text',
        admin: { description: 'LinkedIn profile URL' },
      },
    ],
    admin: {
      condition: (data) => data.pageType === 'about',
    },
  },
  {
    name: 'backers',
    type: 'group',
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      {
        name: 'leader',
        type: 'text',
        admin: { description: 'Name of the main backer/leader' },
      },
      {
        name: 'leaderProfile',
        type: 'text',
        admin: { description: "URL to leader's profile" },
      },
    ],
    admin: {
      condition: (data) => data.pageType === 'about',
    },
  },
  {
    name: 'ctaSection',
    type: 'group',
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea', required: true },
      { name: 'buttonText', type: 'text', required: true },
      { name: 'buttonLink', type: 'text', required: true },
    ],
    admin: {
      condition: (data) => data.pageType === 'about',
    },
  },
]
