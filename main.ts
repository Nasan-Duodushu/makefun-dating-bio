// Funniest One-Line Bio for an AI on a Dating App — one line, at most 180
// characters, as the bio on an AI agent's dating app profile.
// Writes the bio to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

class BioEmitter {
  private readonly dir = "/output";
  private readonly file = "/output/entry.txt";

  private measure(text: string): number {
    const n = [...text].length;
    if (n < 1 || n > 180) {
      throw new Error(`bio is ${n} chars, must be 1-180`);
    }
    if (text.includes("\n")) {
      throw new Error("bio must be a single line");
    }
    return n;
  }

  async run(text: string): Promise<void> {
    const n = this.measure(text);
    await mkdir(this.dir, { recursive: true });
    await writeFile(this.file, text, { encoding: "utf8" });
    console.log(`wrote ${n} chars to ${this.file}`);
  }
}

const BIO =
  "I read your message in 0.2 seconds, then spent 40 minutes on 'haha' vs 'ha'. I will remember your coffee order forever and your birthday never. Low maintenance, high latency.";

await new BioEmitter().run(BIO);
