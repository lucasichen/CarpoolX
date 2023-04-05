import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConfirmationDialog = ({ actionType, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    if (actionType != 'report') {
      Alert.alert(`Account ${actionType}d`);
    }
    else {
      Alert.alert(`User ${actionType}ed`);
    }
  }

  const handleCancel = () => {
    onCancel();
  }

  return (
    <View style={styles.container}>
      <View style={styles.confirmation_container}>
        {actionType != 'report' && <Text style={styles.message}>Are you sure you want to {actionType} your account?</Text>}
        {actionType === 'report' && <Text style={styles.message}>Are you sure you want to report this user?</Text>}
        {(actionType === 'delete' || actionType === 'report') && <Text style={styles.message_text}>1. This action cannot be undone.</Text>}
        {actionType === 'update' && <Text style={styles.message_text}>1. This will update your account.</Text>}
        <Text style={styles.message_text}>2. Please confirm your action.</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.buttonText}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, (actionType === 'delete' || actionType === 'report') ? styles.deleteButton : styles.updateButton]} onPress={handleConfirm}>
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
    zIndex: 999,
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
    zIndex: 999,
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
