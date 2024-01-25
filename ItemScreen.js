// ItemScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { DatabaseContext } from './DatabaseProvider';

const ItemScreen = ({ route }) => {
  const { databases, setDatabases } = useContext(DatabaseContext);
  const { dbName } = route.params;
  const [itemData, setItemData] = useState({
    caseStack: '',
    caseDrop: '',
    btg: '',
    usagePerMonth: '',
    startDate: '',
    endDate: '',
  });

  const saveItem = () => {
    const dbCopy = { ...databases };
    dbCopy[dbName].push(itemData);
    setDatabases(dbCopy);
    // Reset form or navigate back
  };

  return (
    <View>
      {/* Iterate over itemData keys to create TextInputs dynamically */}
      {Object.keys(itemData).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={itemData[key]}
          onChangeText={(text) => setItemData({ ...itemData, [key]: text })}
        />
      ))}
      <Button title="Save Item" onPress={saveItem} />
    </View>
  );
};
