import { useState, useEffect } from "react";
import BuilderSidebar from "../components/builder-sidebar";
import menu from "@/images/menu.svg";
import { blocks } from "../data/builder";
import erase from "@/images/erase.svg";

interface Block {
  category: string;
  blocks: Array<{
    template: string;
    options: Array<{
      var: string;
      type: string;
      values: Array<string>;
    }>;
  }>;
}

interface PromptProps {
  setPrompt: (prompt: string) => void;
}
const PromptPage: React.FC<PromptProps> = ({setPrompt}) => {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState("command");
  const [inputs, setInputs] = useState<Record<string, string>>({});

  // Effect to preserve inputs when switching categories
  useEffect(() => {
    const storedInputs = localStorage.getItem(`inputs_${category}`);
    if (storedInputs) {
      setInputs(JSON.parse(storedInputs));
    }
  }, [category]);

  // Log concatenated inputs whenever inputs change
  useEffect(() => {
    const concatenatedInputs = Object.entries(inputs)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    console.log("Concatenated Inputs:", concatenatedInputs || "No inputs yet");
  }, [inputs]);

  const findCategory = (category: string) => {
    const block = (blocks as Block[]).find(
      (item) => item.category === category
    );
    if (!block) return null;

    const afterBlock = block.blocks.map((b) => {
      const replacements: Record<string, React.ReactNode> = {};
      for (const o of b.options) {
        replacements[o.var] = buildType(o.var, o.type, o.values);
      }

      const parsedTemplate = parseTemplateWithComponents(
        b.template,
        replacements
      );

      return (
        <div
          key={b.template}
          className="p-3 border-2 border-gray-300 rounded-md mb-2 bg-white dark:bg-gray-800 dark:border-gray-600 flex flex-col gap-3 text-lg min-h-[450px] max-h-[570px]"
        >
          {parsedTemplate}
          <div>
            <button
              onClick={clearInputs}
              className={`p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              <img
                className="w-3.5 aspect-square dark:invert"
                src={erase}
                alt=""
                height={20}
                width={20}
              />
            </button>
          </div>
        </div>
      );
    });

    return afterBlock;
  };
  const clearInputs = () => {
    setInputs({});
    localStorage.removeItem(`inputs_${category}`);
  };

  function parseTemplateWithComponents(
    template: string,
    components: Record<string, React.ReactNode>
  ): React.ReactNode[] {
    const regex = /\{(\w+)\}/g;
    const parts: React.ReactNode[] = [];

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(template)) !== null) {
      const [placeholder, key] = match;
      const index = match.index;

      if (index > lastIndex) {
        parts.push(template.slice(lastIndex, index));
      }

      parts.push(components[key] ?? placeholder);

      lastIndex = index + placeholder.length;
    }

    if (lastIndex < template.length) {
      parts.push(template.slice(lastIndex));
    }

    return parts;
  }

  const buildType = (varName: string, type: string, values: Array<string>) => {
    let x = null;
    switch (type) {
      case "dropdown":
        x = (
          <select
            value={inputs[varName] || ""}
            onChange={(e) => handleInputChange(varName, e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option key="" value=""></option>
            {values.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        );
        break;
      case "text_input":
        x = (
          <input
            type="text"
            placeholder={values[0]}
            value={inputs[varName] || ""}
            onChange={(e) => handleInputChange(varName, e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
        break;
      case "textarea":
        x = (
          <textarea
            placeholder={values[0]}
            value={inputs[varName] || ""}
            onChange={(e) => {
              handleInputChange(varName, e.target.value)
              // auto adjust height as needed
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500
             max-h-[300px] min-h-[80px] overflow-y-auto"
          />
        );
        break;

      default:
        break;
    }
    return x;
  };

  const handleInputChange = (varName: string, value: string) => {
    setInputs((prev) => {
      const newInputs = { ...prev, [varName]: value };
      localStorage.setItem(`inputs_${category}`, JSON.stringify(newInputs));
      return newInputs;
    });
  };

  const generateOutput = () => {
    const block = (blocks as Block[]).find(
      (item) => item.category === category
    );
    if (!block) return "";

    let hasContent = false;
    let finalOutput = "";

    block.blocks.forEach((b) => {
      let template = b.template;
      let blockHasContent = false;

      b.options.forEach((o) => {
        const value = inputs[o.var] || "";
        const placeholder = `{${o.var}}`;
        const prefix = template.slice(0, template.indexOf(placeholder));
        const suffix = template.slice(
          template.indexOf(placeholder) + placeholder.length
        );
        const cleanedPrefix = value ? prefix : prefix.replace(/\s+$/, "");

        template = `${cleanedPrefix}${value}${suffix}`;

        if (value) {
          blockHasContent = true;
          hasContent = true;
        }
      });

      if (blockHasContent || template.trim()) {
        finalOutput += template + "\n";
      }
    });
    generateAllOutputs();
    return hasContent ? finalOutput.trim() : "";
  };

  const generateAllOutputs = () => {
    let allOutputs = "";

    (blocks as Block[]).forEach((block) => {
      const category = block.category;
      // Load inputs for the current category from local storage
      const storedInputs = localStorage.getItem(`inputs_${category}`);
      const categoryInputs = storedInputs ? JSON.parse(storedInputs) : {};

      let hasContent = false;
      let categoryOutput = "";

      block.blocks.forEach((b) => {
        let template = b.template;
        let blockHasContent = false;

        b.options.forEach((o) => {
          const value = categoryInputs[o.var] || "";
          const placeholder = `{${o.var}}`;
          const prefix = template.slice(0, template.indexOf(placeholder));
          const suffix = template.slice(
            template.indexOf(placeholder) + placeholder.length
          );
          const cleanedPrefix = value ? prefix : prefix.replace(/\s+$/, "");

          template = `${cleanedPrefix}${value}${suffix}`;

          if (value) {
            blockHasContent = true;
            hasContent = true;
          }
        });

        if (blockHasContent || template.trim()) {
          categoryOutput += template + "\n";
        }
      });

      if (hasContent) {
        allOutputs += ` ${categoryOutput.trim()}`;
      }
    });

    setPrompt(allOutputs.trim());
    return allOutputs.trim();
  };
  return (
    <div className="flex flex-col h-full w-full text-gray-900 dark:text-gray-100">
      <div className="md:hidden fixed top-1 right-1 z-[60]">
        {!expand && (
          <button
            onClick={() => setExpand(true)}
            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
          >
            <img
              src={menu}
              width={20}
              height={20}
              className="dark:invert rotate-180"
              alt="Menu"
            />
          </button>
        )}
      </div>
      <BuilderSidebar
        expand={expand}
        setExpand={setExpand}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        setCategory={setCategory}
        category={category}
        setInputs={setInputs}
        prompt={generateAllOutputs()}
      />
      <div className="flex flex-row items-center gap-4 mb-2">
        <h1 className="text-2xl font-bold align-center flex-3">
          Prompt Builder Playground
        </h1>
        <input
          id="save_name"
          type="text"
          className="flex-1 p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Save Name"
          defaultValue={`save_${Date.now()}`}
        ></input>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-0.5 w-full sm:flex-row">
          <div className="flex-1 p-4 min-h-[200px] max-h-[530px] overflow-y-auto">
            {findCategory(category)}
          </div>
          <div className="flex-1 p-4 border-1 border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 rounded-md h-[530px] overflow-auto">
            <p className="whitespace-pre-wrap">{generateOutput()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;