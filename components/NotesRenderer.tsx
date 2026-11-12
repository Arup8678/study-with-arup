import React from "react";

// Renders the simple markdown used in chapter notes: ## / ### headings, **bold**,
// "- " bullets and "| a | b |" tables (first row is the header).

function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

const splitRow = (line: string) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => c.trim());
const isDivider = (cells: string[]) => cells.every(c => /^[-:\s]+$/.test(c));

export default function NotesRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `b${i}`;

    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = splitRow(lines[i]);
        if (!isDivider(cells)) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={key} className="overflow-x-auto my-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700/40">
                {head.map((c, ci) => <th key={ci} className="px-3 py-2 font-bold text-slate-800 dark:text-slate-100 align-top">{inline(c)}</th>)}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-slate-100 dark:border-slate-700/40">
                  {head.map((_, ci) => <td key={ci} className="px-3 py-2 text-slate-700 dark:text-slate-300 align-top leading-relaxed">{inline(r[ci] || "")}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    i++;
    if (line.trim() === "") continue;

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key} className="text-lg font-extrabold text-slate-900 dark:text-white mt-8 mb-2 pt-4 border-t border-slate-200 dark:border-slate-700/60 font-heading">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      blocks.push(<h3 key={key} className="text-base font-bold text-slate-900 dark:text-white mt-6 mb-1.5">{line.slice(4)}</h3>);
    } else if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      blocks.push(<h4 key={key} className="text-sm font-bold text-blue-700 dark:text-blue-400 mt-4 mb-1">{line.trim().slice(2, -2)}</h4>);
    } else if (line.startsWith("- ")) {
      blocks.push(
        <div key={key} className="flex items-start gap-2 my-1.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
          <span>{inline(line.slice(2))}</span>
        </div>
      );
    } else {
      blocks.push(<p key={key} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-1.5">{inline(line)}</p>);
    }
  }

  return <>{blocks}</>;
}
