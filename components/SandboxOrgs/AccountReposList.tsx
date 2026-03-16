interface AccountReposListProps {
  repos: string[];
}

export function AccountReposList({ repos }: AccountReposListProps) {
  if (repos.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }
  return (
    <ul className="space-y-0.5 text-sm">
      {repos.map((url) => {
        const name = url.split("/").pop() ?? url;
        return (
          <li key={url}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400 truncate block max-w-xs"
              title={url}
            >
              {name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
