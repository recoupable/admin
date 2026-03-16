interface RepoNameCellProps {
  name: string;
  url: string;
}

export function RepoNameCell({ name, url }: RepoNameCellProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-blue-600 hover:underline dark:text-blue-400"
    >
      {name}
    </a>
  );
}
