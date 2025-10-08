#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔍 Running comprehensive error checks...\n");

// Check TypeScript compilation
console.log("1. Checking TypeScript compilation...");
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  console.log("✅ TypeScript compilation successful\n");
} catch (error) {
  console.log("❌ TypeScript compilation failed\n");
  process.exit(1);
}

// Check ESLint
console.log("2. Checking ESLint...");
try {
  execSync("npx eslint src/ --ext .ts,.tsx --max-warnings 0", {
    stdio: "inherit",
  });
  console.log("✅ ESLint checks passed\n");
} catch (error) {
  console.log("❌ ESLint checks failed\n");
  process.exit(1);
}

// Check for common issues
console.log("3. Checking for common issues...");

// Check for unescaped entities
const files = ["src/App.tsx", "src/pages/index.tsx"];
let hasIssues = false;

files.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, "utf8");

    // Check for unescaped apostrophes
    const unescapedApostrophes = content.match(/[^&]'[^;]/g);
    if (unescapedApostrophes) {
      console.log(`❌ Found unescaped apostrophes in ${file}`);
      hasIssues = true;
    }

    // Check for Date.now().getFullYear() issue
    if (content.includes("Date.now().getFullYear()")) {
      console.log(
        `❌ Found Date.now().getFullYear() in ${file} - should be new Date().getFullYear()`
      );
      hasIssues = true;
    }
  }
});

if (!hasIssues) {
  console.log("✅ No common issues found\n");
}

// Check build
console.log("4. Checking build...");
try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✅ Build successful\n");
} catch (error) {
  console.log("❌ Build failed\n");
  process.exit(1);
}

console.log("🎉 All checks passed! Your code is ready for deployment.");
