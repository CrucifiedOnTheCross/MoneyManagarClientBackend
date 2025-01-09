import {useEffect, useState} from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2'; // Используем Bar для столбчатого графика
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';

// Регистрируем необходимые элементы для графика
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
                    `http://localhost:8080/api/statistics/${accountId}`
                );
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
    const dates = Object.keys(statistics).sort(); // Сортируем даты по возрастанию
    const income = dates.map(date => statistics[date].income);
    const expense = dates.map(date => statistics[date].expense);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Доход',
                data: income,
                backgroundColor: 'rgba(0, 128, 0, 0.7)', // Зеленый цвет для доходов
                borderColor: 'green',
                borderWidth: 1,
            },
            {
                label: 'Расход',
                data: expense,
                backgroundColor: 'rgba(255, 0, 0, 0.7)', // Красный цвет для расходов
                borderColor: 'red',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h3>Статистика по месяцам</h3>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {position: 'top'},
                        title: {
                            display: true,
                            text: 'Доходы и расходы по месяцу',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Месяц',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Сумма',
                            },
                            beginAtZero: true, // Оставляем начало оси Y с нуля
                        },
                    },
                }}
            />
        </div>
    );
};

export default MonthlyStatisticsChart;
