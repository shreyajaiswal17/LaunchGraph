"use client";

import { getOpeningTypeDistribution, getTotalLaunches } from "@/lib/analytics";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border border-neutral-200 bg-white p-3 shadow-md text-xs">
        <p className="font-bold text-[#1a1a1a]">{data.label}</p>
        <p className="mt-1 text-neutral-600">
          Distribution:{" "}
          <strong className="text-[#991b1b]">{data.count}</strong>{" "}
          {data.count === 1 ? "launch" : "launches"} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function OpeningTypeChart() {
  const data = getOpeningTypeDistribution();
  const total = getTotalLaunches();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            Opening Narrative Distribution
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Breakdown of narrative hooks framing the anchor post
          </p>
        </div>
        <span className="text-xs text-neutral-400 font-medium">
          {data.length} distinct {data.length === 1 ? "taxonomy" : "taxonomies"}
        </span>
      </div>

      {/* Chart — hidden from screen readers; accessible table below is the a11y equivalent */}
      <div className="h-64 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tick={{ fontSize: 11, fill: "#737373" }}
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={{ stroke: "#e5e5e5" }}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={140}
              tick={{ fontSize: 12, fill: "#1a1a1a", fontWeight: 500 }}
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#991b1b" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data table — visible only to screen readers */}
      <table className="sr-only">
        <caption>
          Opening narrative distribution across {total} selected-work case studies
        </caption>
        <thead>
          <tr>
            <th scope="col">Opening Type</th>
            <th scope="col">Count</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.type}>
              <td>{row.label}</td>
              <td>{row.count}</td>
              <td>{row.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span>Structural narrative classification</span>
        <span>Denominator: {total} selected-work case studies</span>
      </div>
    </div>
  );
}
