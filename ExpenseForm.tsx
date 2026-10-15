import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

import type { ExpenseType } from "../types/expense";

type ExpenseFormProps = {
  onAdd: (title: string, amount: number, type: ExpenseType) => void;
};

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amountText, setAmountText] = useState("");
  const [type, setType] = useState<ExpenseType>("expense");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const cleanTitle = title.trim();
    const normalizedAmount = amountText.trim().replace(",", ".");
    const amount = Number(normalizedAmount);

    if (!cleanTitle) {
      setError("Escribe el concepto del movimiento.");
      return;
    }

    if (!normalizedAmount || !Number.isFinite(amount) || amount <= 0) {
      setError("Introduce un importe válido mayor que cero.");
      return;
    }

    onAdd(cleanTitle, amount, type);

    // Limpiar el formulario después de registrar.
    setTitle("");
    setAmountText("");
    setError("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nuevo movimiento</Text>

      <Text style={styles.label}>Tipo de movimiento</Text>

      <View style={styles.typeContainer}>
        <Pressable
          onPress={() => setType("income")}
          style={[
            styles.typeButton,
            type === "income" && styles.incomeSelected,
          ]}
        >
          <Text
            style={[styles.typeText, type === "income" && styles.selectedText]}
          >
            + Ingreso
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setType("expense")}
          style={[
            styles.typeButton,
            type === "expense" && styles.expenseSelected,
          ]}
        >
          <Text
            style={[styles.typeText, type === "expense" && styles.selectedText]}
          >
            − Gasto
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Concepto</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Compra del supermercado"
        value={title}
        onChangeText={setTitle}
        maxLength={80}
      />

      <Text style={styles.label}>Importe (MXN)</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. 250.50"
        value={amountText}
        onChangeText={setAmountText}
        keyboardType="decimal-pad"
        maxLength={15}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.submitText}>Registrar movimiento</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E5EAF1",
  },
  heading: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    marginTop: 12,
  },
  typeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  incomeSelected: {
    backgroundColor: "#15803D",
  },
  expenseSelected: {
    backgroundColor: "#DC2626",
  },
  typeText: {
    fontWeight: "700",
    color: "#475569",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    color: "#172554",
    fontSize: 15,
  },
  error: {
    color: "#DC2626",
    marginTop: 12,
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: "#1D4ED8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.75,
  },
});
