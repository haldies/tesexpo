import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { requireNativeModule } from 'expo';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TodoModule = requireNativeModule('TodoModule');

export default function TodoListScreen() {
  const [todos, setTodos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(() => {
    try {
      const data = TodoModule.getTodos();
      // Reverse to show newest at top
      setTodos([...data].reverse());
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTodos();
    }, [fetchTodos])
  );

  const handleClearAll = () => {
    Alert.alert(
      "Hapus Semua",
      "Apakah Anda yakin ingin menghapus semua daftar tugas?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          style: "destructive",
          onPress: () => {
            TodoModule.clearTodos();
            setTodos([]);
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Siri Todo List</Text>
        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="mic-outline" size={20} color="#007AFF" />
        <Text style={styles.tipText}>
          Coba katakan: "Hai Siri, tambah tugas [sesuatu] di my-app"
        </Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item, index) => `${item}-${index}`}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#34C759" />
            </View>
            <Text style={styles.todoText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="list" size={48} color="#C7C7CC" />
            <Text style={styles.emptyText}>Belum ada tugas.</Text>
            <Text style={styles.emptySubtext}>Gunakan Siri atau Shortcuts untuk menambahkan tugas baru secara instan!</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.refreshButton}
        onPress={fetchTodos}
      >
        <Ionicons name="refresh" size={20} color="white" />
        <Text style={styles.refreshButtonText}>Cek Update Siri</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  clearButton: {
    padding: 5,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#E5F1FF',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  tipText: {
    marginLeft: 10,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkIcon: {
    marginRight: 12,
  },
  todoText: {
    fontSize: 16,
    color: '#3A3A3C',
    flex: 1,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
