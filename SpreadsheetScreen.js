import React, { useContext } from 'react';
import { View, Button, ScrollView } from 'react-native';
import { DatabaseContext } from './DatabaseProvider';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

// Function to convert array to CSV string
function convertToCSV(data) {
  const header = Object.keys(data[0]).join(',') + '\n';
  const csv = data.map((item) => Object.values(item).join(',')).join('\n');
  return header + csv;
}

// Function to save CSV file and share it
async function saveAndShareCSV(databaseItems) {
  try {
    // Convert data to CSV format
    const csvData = convertToCSV(databaseItems);

    // Define the file path where the CSV file will be saved
    const filePath = `${RNFS.DocumentDirectoryPath}/database.csv`;

    // Write the CSV data to the file
    await RNFS.writeFile(filePath, csvData, 'utf8');

    // Define the options for sharing the file
    const options = {
      type: 'text/csv',
      url: `file://${filePath}`,
    };

    // Share the CSV file
    await Share.open(options);

    console.log('CSV file saved and shared successfully');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const SpreadsheetScreen = ({ route }) => {
  const { databases } = useContext(DatabaseContext);
  const { dbName } = route.params;
  const databaseItems = databases[dbName];

  const handleExport = () => {
    if (databaseItems.length > 0) {
      saveAndShareCSV(databaseItems);
    } else {
      console.log('No data available to export');
    }
  };

  return (
    <ScrollView>
      {/* Display the data items here */}
      <Button title="Export as Spreadsheet" onPress={handleExport} />
    </ScrollView>
  );
};

export default SpreadsheetScreen;
