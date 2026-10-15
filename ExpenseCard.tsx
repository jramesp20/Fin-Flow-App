import { View, Text, Pressable, StyleSheet } from "react-native";
import type { Expense } from "../types/expense";

type ExpenseCardProps = {
  expense: Expense;
  onDelete: (id: string) => void;
};

export default function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const isIncome = expense.type === "income";

  const formattedAmount = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(expense.amount);

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.icon,
          { backgroundColor: isIncome ? "#DCFCE7" : "#FEE2E2" },
        ]}
      >
        <Text style={styles.iconText}>{isIncome ? "↙" : "↗"}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.subtitle}>{isIncome ? "Ingreso" : "Gasto"}</Text>
      </View>

      <View style={styles.right}>
        <Text
          style={[styles.amount, { color: isIncome ? "#15803D" : "#DC2626" }]}
        >
          {isIncome ? "+" : "−"}
          {formattedAmount}
        </Text>

        <Pressable
          onPress={() => onDelete(expense.id)}
          accessibilityRole="button"
          accessibilityLabel={`Eliminar ${expense.title}`}
        >
          <Text style={styles.delete}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E9EEF5",
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 23,
    fontWeight: "800",
    color: "#334155",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 5,
  },
  right: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 13,
    fontWeight: "800",
  },
  delete: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 7,
  },
});
