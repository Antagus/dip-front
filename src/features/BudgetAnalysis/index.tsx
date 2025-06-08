import React, { useMemo, useState } from 'react';
import { Block } from 'shared/ui';
import styled from 'styled-components';

// --- Types ---
export type OperationType = 'income' | 'expense';
export interface Operation {
  id: string;
  type: OperationType;
  category: string;
  amount: number;
}

interface CategoryData {
  category: string;
  total: number;
  color: string;
}

// --- Color Generator ---
const generateColor = (index: number, total: number) => {
  const hue = Math.round((360 * index) / total);
  return `hsl(${hue}, 65%, 55%)`;
};

// --- Styled Components ---
const Card = styled(Block)<{ darkMode: boolean }>`
  background-color: ${p => (p.darkMode ? '#1e1e1e' : '#fff')};
  color: ${p => (p.darkMode ? '#f0f0f0' : '#333')};
  border-radius: 12px;
  padding: 16px;
  width: 340px;
  box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const Toggles = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button<{ active: boolean; darkMode: boolean }>`
  background-color: ${p =>
    p.active
      ? '#427ba4'
      : p.darkMode
      ? '#333'
      : '#eee'};
  color: ${p =>
    p.active
      ? '#fff'
      : p.darkMode
      ? '#ccc'
      : '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    opacity: 0.85;
  }
`;

const AnalysisLabel = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
`;

const ChartBar = styled.div<{ darkMode: boolean }>`
  display: flex;
  align-items: center;
  height: 20px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: ${p => (p.darkMode ? '#333' : '#f2f2f2')};
`;

const ChartSegment = styled.div<{ width: number; color: string }>`
  width: ${p => p.width}%;
  flex-shrink: 0;
  height: 20px;
  background-color: ${p => p.color};
`;

const LegendList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LegendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.875rem;
`;

const LegendLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ColorDot = styled.span<{ color: string }>`
  width: 14px;
  height: 14px;
  background-color: ${p => p.color};
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`;

const Amount = styled.span``;

// --- Main Component ---
interface BudgetAnalysisProps {
  operations: Operation[];
  initialType?: OperationType;
  darkMode?: boolean;
}

export const BudgetAnalysis: React.FC<BudgetAnalysisProps> = ({
  operations,
  initialType = 'expense',
  darkMode = false,
}) => {
  const [type, setType] = useState<OperationType>(initialType);

  const data: CategoryData[] = useMemo(() => {
    const filtered = operations.filter(op => op.type === type);
    const totals = filtered.reduce<Record<string, number>>((acc, op) => {
      acc[op.category] = (acc[op.category] || 0) + op.amount;
      return acc;
    }, {});
    const entries = Object.entries(totals);
    return entries.map(([category, total], idx) => ({
      category,
      total,
      color: generateColor(idx, entries.length),
    }));
  }, [operations, type]);

  const grandTotal = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <Block padding='16px'>
      <Header>
        <Title>Бюджет</Title>
        <Toggles>
          <ToggleButton
            active={type === 'income'}
            darkMode={darkMode}
            onClick={() => setType('income')}
          >
            Доход
          </ToggleButton>
          <ToggleButton
            active={type === 'expense'}
            darkMode={darkMode}
            onClick={() => setType('expense')}
          >
            Расход
          </ToggleButton>
        </Toggles>
      </Header>

      <AnalysisLabel>
        {data.length > 0 ? (
          <>
            <h4>Анализ</h4>
            <>{type === 'expense' ? 'Расход' : 'Доход'}</>
          </>
        ) : (
          <>Нет данных для отображения</>
        )}
      </AnalysisLabel>

      <ChartBar darkMode={darkMode}>
        {data.map(d => (
          <ChartSegment
            key={d.category}
            width={grandTotal > 0 ? (d.total / grandTotal) * 100 : 0}
            color={d.color}
          />
        ))}
      </ChartBar>

      {data.length > 0 && (
        <LegendList>
          {data.map(d => (
            <LegendItem key={d.category}>
              <LegendLeft>
                <ColorDot color={d.color} />
                <span>{d.category}</span>
              </LegendLeft>
              <Amount>{d.total.toLocaleString('ru-RU')} Р</Amount>
            </LegendItem>
          ))}
        </LegendList>
      )}
    </Block>
  );
};

export default BudgetAnalysis;
