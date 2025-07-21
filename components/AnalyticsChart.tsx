import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from './ui/Card';
import type { Job, AdminUser } from '../types';

interface AnalyticsChartProps {
    jobs: Job[];
    users: AdminUser[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ jobs, users }) => {

    const chartData = useMemo(() => {
        // This is sample data generation. In a real app, this would come from a backend.
        const months = ["Sep '23", "Oct '23", "Nov '23", "Dec '23", "Jan '24", "Feb '24"];
        const data = months.map((month, index) => ({
            name: month,
            // Simulate user growth
            "User Signups": 20 + (index * 5) + Math.floor(Math.random() * 10),
            // Simulate job growth
            "Jobs Posted": 10 + (index * 3) + Math.floor(Math.random() * 5),
        }));
        
        // Add current month's data dynamically
        const currentMonthName = new Date().toLocaleString('default', { month: 'short', year: '2-digit' }).replace(' ', "'");
        const lastMonthData = data[data.length-1];

        data.push({
            name: currentMonthName,
            "User Signups": lastMonthData["User Signups"] + users.length,
            "Jobs Posted": lastMonthData["Jobs Posted"] + jobs.length,
        })
        
        return data.slice(-6); // Keep it to 6 months
    }, [jobs, users]);
    
    return (
        <Card>
            <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 20,
                            left: -10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="User Signups" fill="#1e40af" />
                        <Bar dataKey="Jobs Posted" fill="#7dd3fc" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default AnalyticsChart;