import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/contexts/ThemeContext";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";

interface AddProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a project title");
      return;
    }
    onAdd(title.trim());
    setTitle("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.6)" }]}>
        <Card variant="elevated" style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Add New Project
            </Text>
            <IconButton onPress={handleClose} variant="ghost" size="small">
              <X size={20} color={colors.textSecondary} />
            </IconButton>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surfaceSecondary,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            placeholder="Enter project title"
            placeholderTextColor={colors.textTertiary}
            value={title}
            onChangeText={setTitle}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleAdd}
          />

          <View style={styles.buttons}>
            <Button
              title="Cancel"
              onPress={handleClose}
              variant="secondary"
              style={styles.button}
            />
            <Button
              title="Add Project"
              onPress={handleAdd}
              variant="primary"
              style={styles.button}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
});
