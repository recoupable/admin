interface ApiDocsLinkProps {
  path: string;
}

export default function ApiDocsLink({ path }: ApiDocsLinkProps) {
  return (
    <a
      href={`https://developers.recoupable.com/api-reference/${path}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
    >
      API Docs ↗
    </a>
  );
}
