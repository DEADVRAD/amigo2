import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const lineData = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Fév", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 2000, users: 9800 },
  { name: "Avr", revenue: 2780, users: 3908 },
  { name: "Mai", revenue: 1890, users: 4800 },
  { name: "Jun", revenue: 2390, users: 3800 },
  { name: "Jul", revenue: 3490, users: 4300 },
];

const barData = [
  { name: "Lun", visits: 120 },
  { name: "Mar", visits: 300 },
  { name: "Mer", visits: 200 },
  { name: "Jeu", visits: 280 },
  { name: "Ven", visits: 180 },
  { name: "Sam", visits: 230 },
  { name: "Dim", visits: 140 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Tendance des Revenus</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function VisitsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visites Hebdomadaires</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visits" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}