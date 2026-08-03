import { sourcesByIds } from "@/data/sources";

export function SourceList({ title, ids }: { title: string; ids: string[] }) {
  return <div className="source-list"><h3>{title}</h3><ol>{sourcesByIds(ids).map((source) => <li key={source.id}><span>{source.citation}</span>{source.note && <small>{source.note}</small>}</li>)}</ol></div>;
}
