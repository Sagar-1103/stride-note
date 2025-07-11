import { Card } from "@/components/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { Project } from "@/types";
import { router } from "expo-router";
import {
  CircleCheck as CheckCircle,
  ChevronRight,
  Circle,
} from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProjectItemProps {
  project: Project;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { colors } = useTheme();
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const isCompleted = totalTasks > 0 && completedTasks === totalTasks;

  const handlePress = () => {
    router.push(`/project/${project.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Card variant="outlined" style={styles.container}>
        <View style={styles.header}>
          <View style={styles.statusContainer}>
            {isCompleted ? (
              <CheckCircle size={20} color={colors.success} />
            ) : (
              <Circle size={20} color={colors.textTertiary} />
            )}
            <Text
              style={[
                styles.title,
                { color: colors.text },
                isCompleted && { color: colors.success },
              ]}
            >
              {project.title}
            </Text>
          </View>
          <ChevronRight size={20} color={colors.textTertiary} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.taskCount, { color: colors.textSecondary }]}>
            {totalTasks === 0
              ? "No tasks"
              : `${completedTasks} of ${totalTasks} tasks completed`}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isCompleted
                  ? colors.successLight
                  : colors.primaryLight,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: isCompleted ? colors.success : colors.primary,
                },
              ]}
            >
              {isCompleted ? "Completed" : "In Progress"}
            </Text>
          </View>
        </View>

        {totalTasks > 0 && (
          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.borderLight },
            ]}
          >
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: isCompleted
                    ? colors.success
                    : colors.primary,
                  width: `${(completedTasks / totalTasks) * 100}%`,
                },
              ]}
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  taskCount: {
    fontSize: 14,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
});
