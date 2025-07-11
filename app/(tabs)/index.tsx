import { AddProjectModal } from "@/components/AddProjectModal";
import { IconButton } from "@/components/IconButton";
import { ProjectItem } from "@/components/ProjectItem";
import { useProjects } from "@/contexts/ProjectsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProjectsScreen() {
  const { projects, addProject } = useProjects();
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProject = (title: string) => {
    addProject(title);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Projects</Text>
        <IconButton
          onPress={() => setShowAddModal(true)}
          variant="primary"
          size="large"
        >
          <Plus size={24} color="#FFFFFF" />
        </IconButton>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {projects.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>
              No projects yet
            </Text>
            <Text
              style={[styles.emptyDescription, { color: colors.textTertiary }]}
            >
              Create your first project to get started
            </Text>
          </View>
        ) : (
          projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))
        )}
      </ScrollView>

      <AddProjectModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProject}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: "center",
  },
});
