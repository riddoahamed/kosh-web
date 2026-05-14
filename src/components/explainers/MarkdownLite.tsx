import React from "react";

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function renderTable(lines: string[], key: string) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
  const [head, ...body] = rows;
  if (!head) return null;

  return (
    <div key={key} className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-primary/10 text-foreground">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="px-3 py-2 font-semibold">
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {body.map((row, idx) => (
            <tr key={`${key}-row-${idx}`} className="bg-card/50">
              {row.map((cell, cellIdx) => (
                <td key={`${key}-${idx}-${cellIdx}`} className="px-3 py-2 text-foreground/75">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkdownLite({ text, compact = false }: { text: string; compact?: boolean }) {
  const lines = text.split("\n");
  const nodes: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const key = `md-${i}`;

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      const table = renderTable(tableLines, key);
      if (table) nodes.push(table);
      continue;
    }

    if (trimmed.startsWith(">")) {
      nodes.push(
        <blockquote key={key} className="rounded-xl border-l-4 border-primary bg-primary/8 px-4 py-3 text-sm text-foreground/75">
          {renderInline(trimmed.replace(/^>\s?/, ""))}
        </blockquote>
      );
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const items: string[] = [];
      while (i < lines.length) {
        const current = lines[i].trim();
        if (!(ordered ? /^\d+\.\s+/.test(current) : /^[-*]\s+/.test(current))) break;
        items.push(current.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, ""));
        i += 1;
      }
      const List = ordered ? "ol" : "ul";
      nodes.push(
        <List key={key} className={`space-y-1.5 ${ordered ? "list-decimal" : "list-disc"} pl-5 text-sm leading-relaxed text-foreground/75`}>
          {items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{renderInline(item)}</li>
          ))}
        </List>
      );
      continue;
    }

    nodes.push(
      <p key={key} className={`${compact ? "text-base" : "text-sm"} leading-relaxed text-foreground/75`}>
        {renderInline(trimmed)}
      </p>
    );
    i += 1;
  }

  return <div className={compact ? "space-y-4" : "space-y-3"}>{nodes}</div>;
}
