import React from 'react';
import { XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { ForecastsList } from '../model/types/forcast';
import { formatDate } from '../lib/formatDate';

import cls from './weatherCard.module.scss';

interface TemperatureGraphProps {
    weatherData: ForecastsList;
}

export const TemperatureGraph = ({ weatherData }: TemperatureGraphProps) => {
    const graphBg = weatherData[2].main.temp > 0 ? '#e1bb88' : '#cacaef';
    const data = weatherData.map((item) => {
        return {
            date: formatDate(item.dt_txt, {
                day: '2-digit',
                month: '2-digit',
            }),
            temperature: item.main.temp.toFixed(0),
        };
    });

    return (
        <AreaChart
            className={cls.graph}
            width={300}
            height={150}
            data={data}
            margin={{
                top: 70,
                right: 20,
                left: 20,
                bottom: 0,
            }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={graphBg} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={graphBg} stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666', fontSize: 10 }}
            />
            <YAxis axisLine={false} tickLine={false} hide={true} />
            <Tooltip />
            <Area
                className=""
                type="monotone"
                dataKey="temperature"
                stroke={graphBg}
                fillOpacity={1}
                fill="url(#colorUv)"
                label={(props: any) => {
                    const { x, y, value } = props;
                    return (
                        <text
                            x={x}
                            y={y - 10}
                            fill="#666"
                            textAnchor="middle"
                            fontSize={8}
                        >
                            {value}
                        </text>
                    );
                }}
            />
        </AreaChart>
    );
};
