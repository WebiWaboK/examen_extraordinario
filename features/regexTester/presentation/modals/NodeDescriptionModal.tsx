import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  text: string;
  onClose: () => void;
}

export const NodeDescriptionModal = ({ visible, text, onClose }: Props) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <Text style={styles.modalText}>{text}</Text>
        <Pressable onPress={onClose} style={styles.modalButton}>
          <Text style={styles.modalButtonText}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#111',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
