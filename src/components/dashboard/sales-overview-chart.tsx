import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesOverviewChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export function SalesOverviewChart({
  data: salesData,
}: SalesOverviewChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--foreground))", fontSize: 14 }}
                stroke={"hsl(var(--foreground))"}
                strokeWidth={0.5}
              />
              <YAxis
                tick={{ fill: "hsl(var(--foreground))", fontSize: 14 }}
                stroke="hsl(var(--foreground))"
                strokeWidth={0.5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
                cursor={{ fill: "hsl(var(--primary))", opacity: 0.1 }}
              />
              <Legend />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                name="Total"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
