import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import "moment/locale/ru";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip as ReTooltip,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";
import { Block, Row } from "shared/ui";
import { globalStore } from "shared/store/globalStore";

moment.locale("ru");

// === Входные типы ===
interface Transaction {
  id: number;
  transaction_date: string; // ISO-строка
  amount: string;
  is_income: boolean;
}

interface FinanceAnalysisProps {
  accountId: number | undefined;
  initialYear?: number;
  initialMonth?: number;
}

// === Цветовая схема ===
const COLORS = {
  income: "#4caf50",
  expense: "#f44336",
};

// === Стили ===
const Container = styled(Block)`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;

const ChartsRow = styled.div`
  flex-wrap: wrap;
  gap: 32px;
  justify-content: space-between;
`;

const ChartBlock = styled.div`
  flex: 1 1 300px;
  height: 320px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  padding: 4px 8px;
  &:hover {
    opacity: 0.7;
  }
`;

// === Компонент ===
export const FinanceAnalysis: React.FC<FinanceAnalysisProps> = ({
  accountId,
  initialYear,
  initialMonth,
}) => {
  // 1. Инициализируем дату просмотрового месяца
  const init =
    initialYear && initialMonth
      ? moment({ year: initialYear, month: initialMonth - 1 })
      : moment();
  init.locale("ru");
  const [currentDate, setCurrentDate] = useState<moment.Moment>(init);

  // 2. Транзакции
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accountId) return;
    setLoading(true);
    axios
      .get<Transaction[]>(
        `http://localhost:3222/transactions/account/${accountId}`
      )
      .then((resp) => setTransactions(resp.data))
      .catch((e) => console.error("Ошибка загрузки транзакций", e))
      .finally(() => setLoading(false));
  }, [accountId]);

  // 3. Агрегация по дням и подсчет доходов/расходов
  const year = currentDate.year();
  const monthIdx = currentDate.month(); // 0–11
  const daysInMonth = currentDate.daysInMonth();

  const netByDay: Record<number, number> = {};
  for (let d = 1; d <= daysInMonth; d++) netByDay[d] = 0;

  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((tx) => {
    const dt = moment(tx.transaction_date);
    if (dt.year() === year && dt.month() === monthIdx) {
      const day = dt.date();
      const amt = parseFloat(tx.amount);
      if (tx.is_income) {
        netByDay[day] += amt;
        totalIncome += amt;
      } else {
        netByDay[day] -= amt;
        totalExpense += amt;
      }
    }
  });

  const barData = Object.entries(netByDay).map(([day, net]) => ({
    day,
    net,
    fill: net >= 0 ? COLORS.income : COLORS.expense,
  }));

  const pieData = [
    { name: "Расход", value: totalExpense, color: COLORS.expense },
    { name: "Доход", value: totalIncome, color: COLORS.income },
  ];
  const totalSum = totalIncome - totalExpense;

  if (loading) {
    return <Container>Загрузка данных...</Container>;
  }

  return (
    <Block>
      {/* Навигация по месяцам */}
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <NavButton
          onClick={() => setCurrentDate((d) => d.clone().subtract(1, "month"))}
        >
          ◀
        </NavButton>
        <h3>Анализ финансов за {currentDate.format("MMMM YYYY")}</h3>
        <NavButton
          onClick={() => setCurrentDate((d) => d.clone().add(1, "month"))}
        >
          ▶
        </NavButton>
      </Row>

      <ChartsRow>
        {/* 1) Столбчатая диаграмма */}
        <ChartBlock>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              {/* Без сетки */}
              <CartesianGrid horizontal={false} vertical={false} />

              {/* Ось X: только дни */}
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                interval={0}
                padding={{ left: 10, right: 10 }}
              />

              {/* Скрываем всю ось Y, но оставляем возможность ReferenceLine */}
              <YAxis hide domain={["dataMin", "dataMax"]} />

              {/* Линия на уровне Y=0 */}
              <ReferenceLine
                y={0}
                stroke="#999"
                strokeWidth={1}
                strokeDasharray="3 3"
              />

              <ReTooltip
                formatter={(value: number) =>
                  `${value >= 0 ? "+" : ""}${value.toLocaleString("ru-RU")} ${
                    globalStore.selectedAccountId?.currency
                  }`
                }
                labelFormatter={(day: string) => {
                  const date = currentDate.clone().date(Number(day));
                  return date.format("DD MMMM YYYY");
                }}
              />

              <Bar dataKey="net">
                {barData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={entry.fill}
                    radius={entry.net >= 0 ? "5 5 0 0" : "0 0 5 5"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartBlock>

        {/* 2) Круговая (donut) диаграмма */}
        <ChartBlock>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={4}
                labelLine={false}
                stroke="none"
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
                <Label
                  value={`${totalSum.toLocaleString("ru-RU")} ₽`}
                  position="center"
                  fontSize={20}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartBlock>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ margin: 4 }}>
            Доход: {totalIncome.toLocaleString("ru-RU")} ₽
          </p>
          <p style={{ margin: 4 }}>
            Расход: {totalExpense.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </ChartsRow>
    </Block>
  );
};

export default FinanceAnalysis;
