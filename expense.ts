export type ExpenseType = "income" | "expense";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  type: ExpenseType;
};
