import { defineType, defineField, defineArrayMember } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({ name: "date", type: "string", description: "e.g. March 2026" }),
    defineField({ name: "readTime", type: "string", description: "e.g. 7 min read" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});

export const schemaTypes = [post];
