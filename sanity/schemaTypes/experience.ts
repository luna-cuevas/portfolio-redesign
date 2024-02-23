import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
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
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare(selection) {
      const { title, subtitle, startDate, endDate } = selection;
      const startYear = startDate.split('-')[0]; // Assumes date format is "YYYY-MM"
      const endYear = endDate ? endDate.split('-')[0] : 'Present';
      return {
        title: title,
        subtitle: `${subtitle} (${startYear} - ${endYear})`,
      };
    },
  },
});
