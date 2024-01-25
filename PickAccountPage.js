import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const PickAccountPage = ({ onAccountSelected }) => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [pickerValue, setPickerValue] = useState('');

  useEffect(() => {
    // Fetch accounts from the backend and update state
    // Placeholder for fetch logic
    const fetchedAccounts = ['Account 1', 'Account 2', 'Account 3']; // Replace with actual fetch
    setAccounts(fetchedAccounts);
    setFilteredAccounts(fetchedAccounts);
  }, []);

  const filterAccounts = (inputValue) => {
    const filtered = accounts.filter(account =>
      account.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredAccounts(filtered);
    setPickerValue(inputValue);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pick Account"
        value={pickerValue}
        onChangeText={filterAccounts}
        onFocus={() => filterAccounts('')} // To show all accounts when focused
      />
      <ScrollView style={styles.dropdown}>
        {filteredAccounts.map((account, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
              setPickerValue(account);
              onAccountSelected(account);
            }}
          >
            <Text>{account}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => {/* Navigate to Load Data form */}}>
        <Text style={styles.loadData}>Load Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
    marginHorizontal: 20,
  },
  dropdown: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 5,
    borderRadius: 20,
  },
  item: {
    padding: 10,
  },
  loadData: {
    marginHorizontal: 20,
    alignSelf: 'flex-end',
    marginTop: 20,
    fontSize: 16,
  },
});

export default PickAccountPage;

