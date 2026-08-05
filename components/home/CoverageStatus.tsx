import Link from "next/link";
import { allCampaignCoverage } from "@/lib/coverage";
import { formatYearRange } from "@/data/periods";
import { StatusBadge } from "./StatusBadge";

// Generated from the campaign index and the atlas data, so project status lives in
// one place and the counts cannot drift from what the map actually holds.
export function CoverageStatus() {
  const rows = allCampaignCoverage();

  return (
    <table className="hp-coverage">
      <caption className="hp-figure-note">What the atlas holds today, counted from its own data.</caption>
      <thead>
        <tr>
          <th scope="col">Campaign</th>
          <th scope="col">Years</th>
          <th scope="col">Battles</th>
          <th scope="col">Routes</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ campaign, battleCount, routeCount, atlasLink }) => (
          <tr key={campaign.id}>
            <th scope="row">
              {atlasLink ? <Link href={atlasLink}>{campaign.name}</Link> : campaign.name}
            </th>
            <td>{formatYearRange(campaign.startYear, campaign.endYear)}</td>
            <td>{battleCount || "—"}</td>
            <td>{routeCount || "—"}</td>
            <td><StatusBadge status={campaign.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
