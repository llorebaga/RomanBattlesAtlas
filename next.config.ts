import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const githubPagesRepository =
  process.env.GITHUB_PAGES_REPOSITORY ?? "RomanBattlesAtlas";
const githubPagesBasePath = `/${githubPagesRepository}`;

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export",
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
