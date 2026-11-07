type Props = {
  href: string;
  newTabLabel: string; // "(opens in a new tab)" in the page language, read only by screen readers
  className?: string;
  icon?: boolean; // the small arrow; off when the link is itself an icon (the LinkedIn logo)
  children: React.ReactNode;
};

// Every link that leaves the site opens in a new tab and says so.
export function ExternalLink({ href, newTabLabel, className = "", icon = true, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      {icon && (
        <svg
          className="ext-icon"
          width="0.7em"
          height="0.7em"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4.5 1.5h6v6M10.5 1.5 1.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
