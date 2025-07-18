export const blocks = [
  {
    category: "roleplay",
    label: "Role",
    blocks: [
      {
        type: "block",
        template: "You are a/an {adjective} {noun} {preposition} {topic}",
        options: [
          {
            var: "adjective",
            type: "dropdown",
            values: [
              "senior",
              "junior",
              "experienced",
              "novice",
              "professional",
              "enthusiastic",
              "creative",
              "analytical",
              "friendly",
              "formal",
              "other",
              "none",
            ],
          },
          {
            var: "noun",
            type: "text_input",
            values: ["Enter a role (e.g., doctor, developer, writer)"],
          },
          {
            var: "preposition",
            type: "dropdown",
            values: [
              "on",
              "at",
              "for",
              "in",
              "to",
              "with",
              "about",
              "specializing in",
              "working with",
              "working on",
              "focused on",
            ],
          },
          {
            var: "topic",
            type: "text_input",
            values: [
              "Enter a topic or field (e.g., AI, healthcare, marketing)",
            ],
          },
        ],
      },
    ],
  },
  {
    category: "command",
    label: "Main Action",
    blocks: [
      {
        type: "block",
        template: "Your task is to {action} {details}",
        options: [
          {
            var: "action",
            type: "dropdown",
            values: [
              "do",
              "explain",
              "create",
              "analyze",
              "fact check",
              "write",
              "design",
              "solve",
              "advise",
              "describe",
              "research",
              "summarize",
              "critique",
              "generate",
              "evaluate",
              "optimize",
              "compare",
              "predict",
              "translate",
              "improve",
              "plan",
              "review",
              "brainstorm",
              "simplify",
              "validate",
              "customize",
              "integrate",
              "prioritize",
              "fill in the blanks",
              "other",
            ],
          },
          {
            var: "details",
            type: "text_input",
            values: [
              "Provide details or instructions (e.g., a 500-word essay)",
            ],
          },
        ],
      },
    ],
  },
  {
    category: "style",
    label: "Styling",
    blocks: [
      {
        type: "block",
        template:
          "Ensure the response is {tone_style} and in {format}. For example: {example}",
        options: [
          {
            var: "tone_style",
            type: "dropdown",
            values: [
              "friendly",
              "professional",
              "formal",
              "casual",
              "humorous",
              "concise",
              "detailed",
              "persuasive",
              "informal",
              "empathetic",
              "authoritative",
              "playful",
              "neutral",
              "inspirational",
              "sarcastic",
              "conversational",
              "technical",
              "other",
            ],
          },
          {
            var: "format",
            type: "text_input",
            values: ["paragraphs, sentences, code, etc"],
          },
          {
            var: "example",
            type: "text_input",
            values: ["Give an example (optional)."],
          },
        ],
      },
    ],
  },
  {
    category: "rules",
    label: "Styling",
    blocks: [
      {
        type: "block",
        template:
          "Rules to follow: {rules} Include {include} and avoid {avoid} ",
        options: [
          {
            var: "rules",
            type: "text_input",
            values: ["Enter rules ..."],
          },
          {
            var: "include",
            type: "text_input",
            values: ["Enter rules ..."],
          },
          {
            var: "avoid",
            type: "text_input",
            values: ["Enter rules ..."],
          },
        ],
      },
    ],
  },
  {
    category: "define",
    label: "Styling",
    blocks: [
      {
        type: "block",
        template: "Refer to these definitions when needed: {definitions} ",
        options: [
          {
            var: "definitions",
            type: "text_input",
            values: ["Enter definitions ..."],
          },
        ],
      },
    ],
  },
  {
    category: "input",
    label: "Input",
    blocks: [
      {
        type: "block",
        template: "{definitions} ",
        options: [
          {
            var: "definitions",
            type: "text_input",
            values: ["Enter text to paste at the end ..."],
          },
        ],
      },
    ],
  },
];
