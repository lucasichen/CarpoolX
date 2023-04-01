import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConfirmationDialog = ({ actionType, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    Alert.alert(`Account ${actionType}d`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.confirmation_container}>
        <Text style={styles.message}>Are you sure you want to {actionType} your account?</Text>
        {actionType === 'delete' && <Text style={styles.message_text}>1. This action cannot be undone.</Text>}
        {actionType === 'update' && <Text style={styles.message_text}>1. This action will update your account details.</Text>}
        <Text style={styles.message_text}>2.Please confirm your action.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, actionType === 'delete' ? styles.deleteButton : styles.updateButton]} onPress={handleConfirm}>
            <Text style={styles.buttonText}>{actionType}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(226, 226, 226, 0.5)',
    alignItems: 'center',
    position: 'absolute',
    height:'100%',
    width:'100%',
    zIndex: 2,
  },
  confirmation_container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    width: 300,
    height: 220,
    zIndex: 2,
  },
  message: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message_text: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    width: '40%',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#2196f3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmationDialog;
