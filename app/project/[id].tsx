import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import { useProjects } from '@/contexts/ProjectsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskModal } from '@/components/AddTaskModal';
import { IconButton } from '@/components/IconButton';
import { Button } from '@/components/Button';

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, addTask, toggleTask, deleteTask, deleteProject } = useProjects();
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.danger }]}>Project not found</Text>
      </SafeAreaView>
    );
  }

  const completedTasks = project.tasks.filter(task => task.completed).length;
  const totalTasks = project.tasks.length;
  const isCompleted = totalTasks > 0 && completedTasks === totalTasks;

  const handleAddTask = (title: string) => {
    addTask(project.id, title);
  };

  const handleToggleTask = (taskId: string) => {
    toggleTask(project.id, taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(project.id, taskId) },
      ]
    );
  };

  const handleDeleteProject = () => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project? This will also delete all tasks.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            deleteProject(project.id);
            router.back();
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <IconButton onPress={() => router.back()} variant="ghost" size="medium">
          <ArrowLeft size={20} color={colors.text} />
        </IconButton>
        
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>{project.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {totalTasks === 0 ? 'No tasks' : `${completedTasks} of ${totalTasks} completed`}
          </Text>
        </View>
        
        <IconButton onPress={handleDeleteProject} variant="ghost" size="medium">
          <Trash2 size={20} color={colors.danger} />
        </IconButton>
      </View>

      <View style={styles.statusBar}>
        <View style={[
          styles.statusBadge,
          {
            backgroundColor: isCompleted ? colors.successLight : colors.primaryLight,
          }
        ]}>
          <Text style={[
            styles.statusText,
            {
              color: isCompleted ? colors.success : colors.primary,
            }
          ]}>
            {isCompleted ? 'Completed' : 'In Progress'}
          </Text>
        </View>
        <Button
          title="Add Task"
          onPress={() => setShowAddModal(true)}
          variant="primary"
          size="small"
        >
        </Button>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {project.tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: colors.textSecondary }]}>No tasks yet</Text>
            <Text style={[styles.emptyDescription, { color: colors.textTertiary }]}>
              Add your first task to get started
            </Text>
          </View>
        ) : (
          project.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleToggleTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}
      </ScrollView>

      <AddTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});