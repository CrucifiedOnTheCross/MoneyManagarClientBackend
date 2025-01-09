// src/components/MonthlyStatisticsChart/MonthlyStatisticsChart.jsx
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';

// Регистрируем необходимые элементы для графика
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyStatisticsChart = ({accountId}) => {
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Функция для получения статистики
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/statistics/${accountId}`);
                setStatistics(response.data);
            } catch (error) {
                console.error("Error fetching statistics", error);
            } finally {
                setLoading(false);
            }
        };

        if (accountId) {
            fetchStatistics();
        }
    }, [accountId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Подготавливаем данные для графика
    const dates = Object.keys(statistics);
    const income = dates.map(date => statistics[date].income);
    const expense = dates.map(date => statistics[date].expense);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Income',
                data: income,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                fill: true,
            },
            {
                label: 'Expense',
                data: expense,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div>
            <h3>Monthly Statistics</h3>
            <Line data={data} options={{responsive: true, plugins: {legend: {position: 'top'}}}}/>
        </div>
    );
};

export default MonthlyStatisticsChart;
