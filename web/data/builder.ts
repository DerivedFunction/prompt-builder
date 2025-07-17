export const blocks = [
  {
    category: "command",
    label: "Main Action",
    blocks: [
      {
        type: "write",
        template: "Write a {type} about {topic}",
        options: [
          {
            var: "type",
            type: "dropdown",
            values: ["story", "email", "essay", "poem", "report"],
          },
          {
            var: "topic",
            type: "text_input",
            values: ["Enter a topic..."],
          },
        ],
      },
    ],
  },
];
