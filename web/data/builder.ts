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
    category: "code",
    label: "Main Action",
    blocks: [
      {
        type: "block",
        template:
          "Your task is to {action} for a {type} in {language}. {details}",
        options: [
          {
            var: "action",
            type: "dropdown",
            values: [
               
              "code",
              "debug code",
              "refactor code",
              "finish implementing",
              "fix and explain errors",
              "explain this error message",
              "generate code documentation",
              "optimize and refactor code",
              "generate code tests",
              "review this code",
              "generate data",
              "comment",
              "validate code",
              "deploy",
              "scrape",
              "simulate",
              "format code",
            ],
          },
          {
            var: "type",
            type: "dropdown",
            values: [
              "Function",
              "Class",
              "Module",
              "Script",
              "Web App",
              "API",
              "Component",
              "Library",
              "Database",
              "Model",
              "Bot",
              "CLI",
              "Plugin",
              "Template",
              "Service",
              "Project",
              "Game",
            ],
          },
          {
            var: "language",
            type: "dropdown",
            values: [
               
              "Python",
              "JavaScript",
              "Java",
              "C",
              "C++",
              "C#",
              "Ruby",
              "PHP",
              "Go",
              "Swift",
              "Kotlin",
              "TypeScript",
              "R",
              "SQL",
              "HTML/CSS",
              "Rust",
              "Bash",
              "React",
              "Angular",
              "Vue",
              "Django",
              "Flask",
              "Spring",
              "Laravel",
              "Ruby on Rails",
              "Flutter",
              "TensorFlow",
              "PyTorch",
              "Express",
              ".NET",
            ],
          },
          {
            var: "details",
            type: "text_input",
            values: ["Provide additional details"],
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
