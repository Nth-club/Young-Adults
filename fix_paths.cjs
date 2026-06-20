const fs = require('fs');

// Fix data.ts
let data = fs.readFileSync('src/data.ts', 'utf8');
if (!data.includes('import { images }')) {
  data = `import { images } from "./images";\n` + data;
}

data = data.replace(/"\/static\/assets\/employees\/(\d+)\.jpg"/g, (match, p1) => {
  return `images.employees["${p1}"]`;
});

data = data.replace(/"\/assets\/employees\/(\d+)\.jpg"/g, (match, p1) => {
  return `images.employees["${p1}"]`;
});

fs.writeFileSync('src/data.ts', data);
console.log("data.ts fixed!");

// Fix ResultsSection.tsx
let results = fs.readFileSync('src/components/ResultsSection.tsx', 'utf8');
if (!results.includes('import { images }')) {
  results = results.replace(/import { translations, LanguageType } from '\.\.\/data';/, `import { translations, LanguageType } from '../data';\nimport { images } from "../images";`);
}

results = results.replace(/"https:\/\/res\.cloudinary\.com\/YOURCLOUD\/image\/upload\/(cert\d+)\.jpg"/g, (match, p1) => {
  return `images.results.${p1}`;
});

fs.writeFileSync('src/components/ResultsSection.tsx', results);
console.log("ResultsSection.tsx fixed!");
