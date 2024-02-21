import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'MM-YYYY',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'MM-YYYY',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'company',
      date: 'startDate',
    },
    prepare(selection) {
      const { title, subtitle, date } = selection;
      const year = date.split('-')[0]; // Assumes date format is "YYYY-MM"
      return {
        title: title,
        subtitle: `${subtitle} (${year})`,
      };
    },
  },
});

