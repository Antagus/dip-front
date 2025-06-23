import axios from "axios";
import { globalStore } from "shared/store/globalStore";
import { Category, Transaction } from "shared/store/type";

export interface CategorySummary {
  id: string; // id категории
  type: string; // categoryType из Category, например "expense" или "income"
  category: string; // categoryName
  amount: number; // сумма всех транзакций в этой категории за месяц
  color: string;
}

/**
 * Собирает статистику по категориям за указанный год и месяц:
 * - группирует все транзакции по category_id
 * - суммирует поле amount (приводя к number)
 * - берёт из стора название и тип категории
 *
 * @param year 4-значный год, например 2025
 * @param month номер месяца 1–12
 */

export function getMonthlyCategorySummarySync(
  year: number,
  month: number,
  allTx: Transaction[],
  allCats: Category[]
): CategorySummary[] {
  // всё синхронно
  const filtered = allTx.filter((tx) => {
    const d = new Date(tx.transaction_date);
    return d.getFullYear() === year && d.getMonth() === month - 1;
  });

  const sumsByCat: Record<number, number> = {};
  filtered.forEach((tx) => {
    const cid = tx.category_id;
    const amt = parseFloat(tx.amount);
    sumsByCat[cid] = (sumsByCat[cid] || 0) + amt;
  });

  console.log(
    Object.entries(sumsByCat).map(([cidStr, total]) => {
      const cid = Number(cidStr);
      const cat = allCats.find((c) => c.id === cid);
      return {
        id: cidStr,
        type: cat?.categoryType ?? "unknown",
        category: cat?.categoryName ?? "Неизвестная категория",
        amount: total,
      };
    })
  );

  return Object.entries(sumsByCat).map(([cidStr, total]) => {
    const cid = Number(cidStr);
    const cat = allCats.find((c) => c.id === cid);
    return {
      id: cidStr,
      type: cat?.categoryType ?? "unknown",
      category: cat?.categoryName ?? "Неизвестная категория",
      amount: total,
      color: cat?.color ?? "gray",
    };
  });
}
