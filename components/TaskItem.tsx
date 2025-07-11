import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { useTheme } from "@/contexts/ThemeContext";
import { Task } from "@/types";
import {
  CircleCheck as CheckCircle,
  Circle,
  Trash2,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  const { colors } = useTheme();

  return (
    <Card variant="outlined" style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={onToggle}>
        <View style={styles.checkContainer}>
          {task.completed ? (
            <CheckCircle size={24} color={colors.success} />
          ) : (
            <Circle size={24} color={colors.textTertiary} />
          )}
        </View>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            task.completed && {
              color: colors.textSecondary,
              textDecorationLine: "line-through",
            },
          ]}
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      <IconButton onPress={onDelete} variant="ghost" size="small">
        <Trash2 size={16} color={colors.danger} />
      </IconButton>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    flex: 1,
    fontWeight: "500",
  },
});
