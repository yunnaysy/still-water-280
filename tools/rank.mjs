import { drafts } from "../lib/drafts.ts";
import { finalText } from "../main.ts";

const labels = ["relaxes", "shows", "craft", "dwarfs", "fresh"];
const weights = [8, 6, 4, 3, 2];

const scored = [
  { id: "slow-reading", scores: [9, 9, 8, 9, 9], why: "A mountain reading a valley for a million years is patient, original, and ends on an unfinished, growing image." },
  { id: "starlight", scores: [9, 9, 8, 9, 8], why: "Old starlight arriving before language slows the reader; the forest image dwarfs, and nothing is instructed." },
  { id: "snowfall", scores: [9, 9, 9, 7, 8], why: "Snow settling over a city is pure shown calm with strong beats; less deep time than the leaders." },
  { id: "reading-shore", scores: [9, 9, 8, 8, 8], why: "The shore metaphor is gentle and fresh, but the vast scale is smaller than mountain or starlight." },
  { id: "earth-hum", scores: [9, 9, 8, 8, 8], why: "The planetary hum is quiet and shown, though the image is less concrete than stone or snow." },
  { id: "abyssal-snow", scores: [8, 9, 8, 9, 9], why: "Snow of dead stars on the lightless floor is vast and fresh; slightly less soothing than the top two." },
  { id: "canyon", scores: [8, 9, 8, 9, 8], why: "The river writing by erasing is a strong deep-time image with good cadence." },
  { id: "salt-desert", scores: [8, 9, 8, 8, 9], why: "Shells in salt and an unfinished horizon are fresh and quiet; the calm is a little more remote." },
  { id: "whale-fall", scores: [7, 9, 8, 9, 9], why: "The cold community is original and vast, but the sinking and sharks carry a trace of tension." },
  { id: "moon-leaving", scores: [8, 8, 8, 9, 8], why: "The moon's slow departure is tender and vast; the friend simile is the least fresh turn." },
  { id: "glacier", scores: [8, 8, 8, 8, 8], why: "The thousand-year snowflake is patient and concrete, but the mountain forgetting is less precise." },
  { id: "seeds", scores: [8, 8, 8, 8, 8], why: "Twenty thousand winters is deep time, though the seed's patience is a familiar image." },
  { id: "library", scores: [9, 8, 8, 6, 7], why: "The night library is deeply settling, but its scale is human and the warmth turn is mild." },
  { id: "lichen", scores: [8, 8, 8, 8, 8], why: "A hundred thousand years on rock is vast and slow; the coat simile is gentle but common." },
  { id: "tides", scores: [8, 8, 8, 8, 7], why: "The sea's breathing and promise to the moon are calm; the breathing image edges toward stock wellness." },
  { id: "redwood", scores: [8, 8, 7, 8, 7], why: "The rings as a rain calendar is concrete and old; the wound turn is less quiet than the rest." },
  { id: "magnetic", scores: [7, 8, 7, 9, 9], why: "Flipped poles and the pause between answers are vast and fresh, but the compasses line adds tension." },
];

const total = (scores) => scores.reduce((sum, score, i) => sum + score * weights[i], 0);

const ranked = [...scored].sort((a, b) => total(b.scores) - total(a.scores));

console.log("Draft ranking (weights: relaxes 8, shows 6, craft 4, dwarfs 3, fresh 2)");
console.log("=========================================================================");
for (const entry of ranked) {
  const scores = entry.scores.map((s, i) => `${labels[i]} ${s}`).join(", ");
  console.log(`${String(total(entry.scores)).padStart(3)}  ${entry.id.padEnd(14)} ${scores}`);
  console.log(`      ${entry.why}`);
}

const topTwo = ranked.slice(0, 2).map((entry) => entry.id);
console.log("\nBest two: " + topTwo.join(", "));

const revisions = {
  "slow-reading": [
    {
      n: 1,
      note: "draft: three concrete beats, but \"grain\" is harder than it needs to be and \"has not once\" lingers.",
      text: "You read one word at a time. A mountain does the same: one frost, one thaw, one grain of stone. The mountain has been reading the valley for a million years, and the valley has not once asked to be finished.",
    },
    {
      n: 2,
      note: "soften \"grain\" to \"flake\", cut the repeated subject to \"It\", and tighten \"has not once\" to \"has never\".",
      text: "You read one word at a time. A mountain does the same: one frost, one thaw, one flake of stone. It has been reading the valley for a million years, and the valley has never asked to be finished.",
    },
    {
      n: 3,
      note: "final: front \"For a million years\" so the duration slows the middle and the last line stays on the growing valley.",
      text: "You read one word at a time. A mountain does the same: one frost, one thaw, one flake of stone. For a million years it has been reading the valley, and the valley has never asked to be finished.",
    },
  ],
  starlight: [
    {
      n: 1,
      note: "draft: the forest image is vast, but \"still\" and \"only\" can be cut and the last line can breathe.",
      text: "The light reaching you now left its star before your language existed. It crossed the dark without rushing and found you reading. Some began when the first forests were still deciding how tall to grow. It does not ask what you are. It only arrives, older than any answer.",
    },
    {
      n: 2,
      note: "cut \"still\", \"only\", and \"now\"; the sentences settle faster without losing the deep time.",
      text: "The light reaching you left its star before your language existed. It crossed the dark without rushing and found you reading. Some began when the first forests were deciding how tall to grow. It does not ask what you are. It arrives older than any answer.",
    },
    {
      n: 3,
      note: "final for this branch: drop the question line entirely so the piece ends on the image that keeps growing.",
      text: "The light reaching you left its star before your language existed. It crossed the dark without rushing and found you reading. Some began when the first forests were deciding how tall to grow. It arrives older than any answer.",
    },
  ],
};

for (const id of topTwo) {
  console.log(`\nRevisions: ${id}`);
  console.log("-----------------------------------------");
  for (const rev of revisions[id]) {
    console.log(`v${rev.n} (${[...rev.text].length} code points) ${rev.note}`);
    console.log(rev.text);
  }
}

console.log("\nFinal text");
console.log("==========");
console.log(finalText);
console.log(`Length: ${[...finalText].length} code points`);
