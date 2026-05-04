interface Props {
  highlight: string;
  details: string[];
  stack: string[];
}

export default function CardBody({ highlight, details, stack }: Props) {
  return (
    <div className="text-muted-foreground space-y-2 px-2 pb-4 text-xs">
      <p className="border-foreground/30 text-foreground border-l-3 pl-3 font-mono italic">
        {highlight}
      </p>
      {details.length > 0 && (
        <ul className="flex flex-col gap-2">
          {details.map((d, i) => (
            <li key={i} className="text-foreground font-extralight">
              <span className="text-foreground/40">› </span>
              {d}
            </li>
          ))}
        </ul>
      )}
      <p className="text-muted-foreground/80">
        <span className="text-foreground/40">// </span>
        {stack.join(', ')}
      </p>
    </div>
  );
}
