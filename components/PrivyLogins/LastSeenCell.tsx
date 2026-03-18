interface LastSeenCellProps {
  getValue: () => number | null;
}

export default function LastSeenCell({ getValue }: LastSeenCellProps) {
  const ts = getValue();
  if (!ts) return <span className="text-gray-400 italic">Never</span>;
  return <span>{new Date(ts * 1000).toLocaleString()}</span>;
}
