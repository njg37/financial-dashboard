"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts";

interface ClientData {
  name: string;
  size: number;
}

export default function BubbleChart() {
  const [clients, setClients] = useState<ClientData[]>([]);

  useEffect(() => {
    fetchData<{ clientsBubble: ClientData[] }>("/api/charts").then((data) => {
      if (data) setClients(data.clientsBubble);
    });
  }, []);

  const colors = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#eab308"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Clients</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="name" type="category" />
          <YAxis hide dataKey="size" type="number" />
          <ZAxis dataKey="size" range={[100, 500]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={clients}>
            {clients.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
