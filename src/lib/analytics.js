import { launches as defaultLaunches } from "@/data/launches";

/**
 * Total launches in dataset
 */
export function getTotalLaunches(dataset = defaultLaunches) {
  return dataset.length;
}

/**
 * Get single launch by slug
 */
export function getLaunchBySlug(slug, dataset = defaultLaunches) {
  return dataset.find((item) => item.slug === slug);
}

/**
 * Get related launches based on shared openingType or >=2 matching evidence attributes
 */
export function getRelatedLaunches(currentSlug, limit = 3, dataset = defaultLaunches) {
  const current = dataset.find((item) => item.slug === currentSlug);
  if (!current) return [];

  const candidates = dataset.filter((item) => item.slug !== currentSlug);

  const scored = candidates.map((item) => {
    let score = 0;
    // Same opening type gives a strong match
    if (item.openingType === current.openingType) {
      score += 3;
    }
    // Matching boolean evidence signals
    if (item.accountType === current.accountType) score += 1;
    if (item.containsFundingProof === current.containsFundingProof) score += 1;
    if (item.containsProductAnnouncement === current.containsProductAnnouncement) score += 1;
    if (item.containsFounderStory === current.containsFounderStory) score += 1;
    if (item.containsVideo === current.containsVideo) score += 1;

    return { item, score };
  });

  // Filter for those with significant similarity (score >= 3) and sort descending
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.item);
}

/**
 * Count and percentage of launches using founder accounts
 */
export function getFounderAccountStats(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return { count: 0, percentage: 0 };
  const count = dataset.filter((item) => item.accountType === "founder").length;
  const percentage = Math.round((count / total) * 100);
  return { count, percentage };
}

/**
 * Count and percentage of launches containing video assets
 */
export function getVideoStats(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return { count: 0, percentage: 0 };
  const count = dataset.filter((item) => item.containsVideo).length;
  const percentage = Math.round((count / total) * 100);
  return { count, percentage };
}

/**
 * Count and percentage of launches containing funding or backing proof
 */
export function getFundingProofStats(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return { count: 0, percentage: 0 };
  const count = dataset.filter((item) => item.containsFundingProof).length;
  const percentage = Math.round((count / total) * 100);
  return { count, percentage };
}

/**
 * Count and percentage of launches containing product announcements
 */
export function getProductAnnouncementStats(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return { count: 0, percentage: 0 };
  const count = dataset.filter((item) => item.containsProductAnnouncement).length;
  const percentage = Math.round((count / total) * 100);
  return { count, percentage };
}

/**
 * Count and percentage of launches containing founder stories
 */
export function getFounderStoryStats(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return { count: 0, percentage: 0 };
  const count = dataset.filter((item) => item.containsFounderStory).length;
  const percentage = Math.round((count / total) * 100);
  return { count, percentage };
}

/**
 * Count and percentage of founder-led launches containing funding/backing proof
 */
export function getFounderFundingProofStats(dataset = defaultLaunches) {
  const founderLaunches = dataset.filter((item) => item.accountType === "founder");
  const totalFounders = founderLaunches.length;
  if (totalFounders === 0) return { count: 0, percentage: 0, totalFounders: 0 };
  const count = founderLaunches.filter((item) => item.containsFundingProof).length;
  const percentage = Math.round((count / totalFounders) * 100);
  return { count, percentage, totalFounders };
}

/**
 * Count and percentage of founder-led launches containing product announcements
 */
export function getFounderProductAnnouncementStats(dataset = defaultLaunches) {
  const founderLaunches = dataset.filter((item) => item.accountType === "founder");
  const totalFounders = founderLaunches.length;
  if (totalFounders === 0) return { count: 0, percentage: 0, totalFounders: 0 };
  const count = founderLaunches.filter((item) => item.containsProductAnnouncement).length;
  const percentage = Math.round((count / totalFounders) * 100);
  return { count, percentage, totalFounders };
}

/**
 * Count of launches containing both funding/backing proof and video
 */
export function getFundingAndVideoStats(dataset = defaultLaunches) {
  const total = dataset.length;
  const count = dataset.filter((item) => item.containsFundingProof && item.containsVideo).length;
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return { count, percentage, total };
}

/**
 * Count of launches for each combination of signals
 */
export function getSignalCombinations(dataset = defaultLaunches) {
  const map = {};
  dataset.forEach((item) => {
    const key = [
      item.accountType === "founder" ? "Founder" : "Company",
      item.containsFundingProof ? "FundingProof" : "NoFunding",
      item.containsProductAnnouncement ? "ProductAnnouncement" : "NoAnnouncement",
      item.containsVideo ? "Video" : "NoVideo",
    ].join(" + ");
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([combination, count]) => ({
    combination,
    count,
  }));
}

/**
 * Signal prevalence array suitable for horizontal bar chart
 */
export function getSignalPrevalence(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return [];

  const signals = [
    {
      name: "Founder-led account",
      count: dataset.filter((item) => item.accountType === "founder").length,
    },
    {
      name: "Funding/backing proof",
      count: dataset.filter((item) => item.containsFundingProof).length,
    },
    {
      name: "Video asset",
      count: dataset.filter((item) => item.containsVideo).length,
    },
    {
      name: "Product announcement",
      count: dataset.filter((item) => item.containsProductAnnouncement).length,
    },
    {
      name: "Founder story",
      count: dataset.filter((item) => item.containsFounderStory).length,
    },
  ];

  return signals.map((sig) => ({
    ...sig,
    percentage: Math.round((sig.count / total) * 100),
    total,
    label: `${sig.count}/${total} (${Math.round((sig.count / total) * 100)}%)`,
  }));
}

/**
 * Distribution of opening types
 */
export function getOpeningTypeDistribution(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return [];

  const counts = dataset.reduce((acc, item) => {
    acc[item.openingType] = (acc[item.openingType] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([type, count]) => ({
      type,
      label: formatOpeningType(type),
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Distribution of platforms
 */
export function getPlatformDistribution(dataset = defaultLaunches) {
  const total = dataset.length;
  if (total === 0) return [];

  const counts = dataset.reduce((acc, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([platform, count]) => ({
      platform,
      label: formatPlatform(platform),
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Account type distribution (individual founders vs. company entities)
 */
export function getAccountTypeDistribution(dataset = defaultLaunches) {
  const total = dataset.length;
  const individualCount = dataset.filter((i) => i.accountType === "founder").length;
  const companyCount = dataset.filter((i) => i.accountType === "company").length;
  return {
    individualCount,
    companyCount,
    total,
  };
}

/**
 * Formats opening type identifiers into human-readable labels
 */
export function formatOpeningType(type) {
  const map = {
    product_and_funding: "Product + funding",
    challenge_hook: "Challenge hook",
    funding_and_scale: "Funding + scale",
    founder_story: "Founder story",
    funding_and_milestone: "Funding + milestone",
    product_and_backing: "Product + backing",
  };
  return map[type] || type.replace(/_/g, " ");
}

/**
 * Formats platform identifiers into human-readable labels
 */
export function formatPlatform(platform) {
  const map = {
    X: "X",
    X_and_LinkedIn: "X & LinkedIn",
    LinkedIn: "LinkedIn",
    YouTube: "YouTube",
  };
  return map[platform] || platform.replace(/_/g, " ");
}

/**
 * Formats account type identifiers into human-readable labels
 */
export function formatAccountType(type) {
  const map = {
    founder: "Founder",
    company: "Company",
    creator: "Featured Account",
  };
  return map[type] || type;
}
