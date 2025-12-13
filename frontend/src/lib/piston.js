// Piston API is a service for remote code execution
const PISTON_API = "https://emkc.org/api/v2/piston";

// Supported languages and versions
const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * Executes source code using the Piston API
 *
 * @param {string} language - Programming language key (javascript | python | java)
 * @param {string} code - Source code to execute
 * @returns {Promise<{success: boolean, output?: string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const config = LANGUAGE_VERSIONS[language];

    if (!config) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();

    // IMPORTANT: Piston returns stdout & stderr separately
    const stdout = data.run?.stdout?.trim() || "";
    const stderr = data.run?.stderr?.trim() || "";

    // If runtime error exists
    if (stderr) {
      return {
        success: false,
        output: stdout,
        error: stderr,
      };
    }

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

/**
 * Returns correct file extension based on language
 */
function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
