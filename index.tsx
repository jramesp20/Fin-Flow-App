import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import type { Expense, ExpenseType } from "../types/expense";

type Filter = "all" | "income" | "expense";

export default function HomeScreen() {
  // Estado principal: todos los movimientos registrados.
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Estado del filtro seleccionado.
  const [filter, setFilter] = useState<Filter>("all");

  // Registrar un movimiento recibido desde ExpenseForm.
  const addExpense = (title: string, amount: number, type: ExpenseType) => {
    const newExpense: Expense = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      amount,
      type,
    };

    setExpenses((current) => [newExpense, ...current]);
  };

  // Eliminar un movimiento por su identificador.
  const deleteExpense = (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  // Calcular los ingresos.
  const income = expenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  // Calcular los gastos.
  const expenseTotal = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  // El saldo se calcula automáticamente.
  const balance = income - expenseTotal;

  // Aplicar el filtro seleccionado.
  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "income") {
      return expense.type === "income";
    }

    if (filter === "expense") {
      return expense.type === "expense";
    }

    return true;
  });

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.eyebrow}>FIN FLOW</Text>
      <Text style={styles.title}>Mi control de gastos</Text>
      <Text style={styles.subtitle}>Administra tus ingresos y tus gastos.</Text>

      {/* Tarjeta principal del saldo */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>{formatMoney(balance)}</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Ingresos</Text>
            <Text style={styles.incomeAmount}>{formatMoney(income)}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gastos</Text>
            <Text style={styles.expenseAmount}>
              {formatMoney(expenseTotal)}
            </Text>
          </View>
        </View>
      </View>

      {/* Formulario reutilizable */}
      <ExpenseForm onAdd={addExpense} />

      {/* Filtros */}
      <Text style={styles.sectionTitle}>Movimientos</Text>

      <View style={styles.filters}>
        {(
          [
            { label: "Todos", value: "all" },
            { label: "Ingresos", value: "income" },
            { label: "Gastos", value: "expense" },
          ] as { label: string; value: Filter }[]
        ).map((item) => (
          <Pressable
            key={item.value}
            onPress={() => setFilter(item.value)}
            style={[
              styles.filterButton,
              filter === item.value && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.value && styles.activeFilterText,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Lista de movimientos */}
      {filteredExpenses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>💳</Text>
          <Text style={styles.emptyTitle}>No hay movimientos</Text>
          <Text style={styles.emptyText}>
            Registra tu primer ingreso o gasto en el formulario.
          </Text>
        </View>
      ) : (
        filteredExpenses.map((item) => (
          <ExpenseCard key={item.id} expense={item} onDelete={deleteExpense} />
        ))
      )}

      <Text style={styles.footer}>
        {expenses.length}{" "}
        {expenses.length === 1
          ? "movimiento registrado"
          : "movimientos registrados"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  content: {
    padding: 20,
    paddingTop: 28,
    paddingBottom: 36,
  },
  eyebrow: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#2563EB",
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#172554",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    marginBottom: 22,
  },
  balanceCard: {
    backgroundColor: "#1D4ED8",
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
  },
  balanceLabel: {
    color: "#DBEAFE",
    fontSize: 14,
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: "#FFFFFF1A",
    padding: 12,
    borderRadius: 12,
  },
  summaryLabel: {
    color: "#DBEAFE",
    fontSize: 12,
    marginBottom: 7,
  },
  incomeAmount: {
    color: "#BBF7D0",
    fontSize: 15,
    fontWeight: "800",
  },
  expenseAmount: {
    color: "#FECACA",
    fontSize: 15,
    fontWeight: "800",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 14,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  activeFilter: {
    backgroundColor: "#1D4ED8",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  empty: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    padding: 26,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#334155",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    marginTop: 7,
  },
  footer: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});
