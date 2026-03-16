interface CommitMessagesListProps {
  messages: string[];
}

export function CommitMessagesList({ messages }: CommitMessagesListProps) {
  if (messages.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <ol className="list-decimal list-inside space-y-0.5 text-sm">
      {messages.map((msg, i) => (
        <li key={i} className="truncate max-w-xs" title={msg}>
          {msg}
        </li>
      ))}
    </ol>
  );
}
