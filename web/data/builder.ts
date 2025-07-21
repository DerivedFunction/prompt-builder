export const blocks = [
  {
    category: "roleplay",
    newLine: false,
    blocks: [
      {
        template: "You are a/an {adjective} {noun} {preposition} {topic}",
        options: [
          {
            var: "adjective",
            type: "dropdown",
            values: [
              "helpful",
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
              "casual",
              "humorous",
              "concise",
              "detailed",
              "persuasive",
              "informal",
              "empathetic",
            ],
          },
          {
            var: "noun",
            type: "text_input",
            values: [
              "Enter a role (e.g., doctor, developer, writer, assistant)",
            ],
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
              "named",
            ],
          },
          {
            var: "topic",
            type: "textarea",
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
    newLine: false,
    blocks: [
      {
        template: "Your task is to {action} {details}",
        options: [
          {
            var: "action",
            type: "dropdown",
            values: [
              "do",
              "work with",
              "explain",
              "create",
              "analyze",
              "fact check",
              "assist",
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
            ],
          },
          {
            var: "details",
            type: "textarea",
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
    newLine: false,
    blocks: [
      {
        template:
          "Ensure the response is {tone_style} and in this format: {format}",
        options: [
          {
            var: "tone_style",
            type: "dropdown",
            values: [
              "clear",
              "friendly",
              "professional",
              "formal",
              "casual",
              "humorous",
              "concise",
              "detailed",
              "detailed and concise",
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
            ],
          },
          {
            var: "format",
            type: "textarea",
            values: ["paragraphs, sentences, code, etc"],
          },
        ],
      },
    ],
  },
  {
    category: "rules",
    newLine: true,
    blocks: [
      {
        template: "Rules: \n{rules}",
        options: [
          {
            var: "rules",
            type: "textarea",
            values: [
              "1. Create an outline step by step first... \n2. Include this and exclude that... ",
            ],
          },
        ],
      },
    ],
  },
  {
    category: "define",
    newLine: true,
    blocks: [
      {
        template: "Refer to these definitions: \n{definitions} ",
        options: [
          {
            var: "definitions",
            type: "textarea",
            values: ["Enter definitions ..."],
          },
        ],
      },
    ],
  },
  {
    category: "example",
    newLine: true,
    blocks: [
      {
        template: "Examples: \n{examples} ",
        options: [
          {
            var: "examples",
            type: "textarea",
            values: ["Enter examples ..."],
          },
        ],
      },
    ],
  },
  {
    category: "input",
    newLine: true,
    blocks: [
      {
        template: "{other} ",
        options: [
          {
            var: "other",
            type: "textarea",
            values: ["What do you want to do?"],
          },
        ],
      },
    ],
  },
];
