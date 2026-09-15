"use client";

import { getSignalPrevalence } from "@/lib/analytics";
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
        <p className="font-bold text-[#1a1a1a]">{data.name}</p>
        <p className="mt-1 text-neutral-600">
          Prevalence:{" "}
          <strong className="text-[#991b1b]">
            {data.count} of {data.total}
          </strong>{" "}
          launches ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function SignalPrevalenceChart() {
  const data = getSignalPrevalence();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-xs">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            Signal Prevalence Across Launches
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Frequency of structural attributes across anchor posts
          </p>
        </div>
        <span className="text-xs text-neutral-400 font-medium">
          Denominator: {data.length > 0 ? data[0].total : 9} selected-work case studies
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
              domain={[0, 9]}
              ticks={[0, 2, 4, 6, 8, 9]}
              tick={{ fontSize: 11, fill: "#737373" }}
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={{ stroke: "#e5e5e5" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tick={{ fontSize: 12, fill: "#1a1a1a", fontWeight: 500 }}
              axisLine={{ stroke: "#e5e5e5" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#991b1b" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data table — visible only to screen readers */}
      <table className="sr-only">
        <caption>Signal prevalence across {data.length > 0 ? data[0].total : 9} selected-work case studies</caption>
        <thead>
          <tr>
            <th scope="col">Signal</th>
            <th scope="col">Count</th>
            <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.count} of {row.total}</td>
              <td>{row.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        <span>Observable public launch attributes</span>
        <span>Values calculated dynamically from verified dataset</span>
      </div>
    </div>
  );
}
