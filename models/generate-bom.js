//kludge script to parse the BOM output from FreeCAD.
//
// 1. Export STEP file from Fusion360
// 2. Import into FreeCAD
// 3. Create 'Summary BOM' in FreeCAD, save as bom.csv
// 4. Run 'node.sh rollup.js' to get the rolledup BOM to bom-rollup.csv

// Required modules
const fs = require('fs');
const { Transform } = require('stream');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Input and output file paths
const inputFile = 'bom.csv';   // Replace with your input file path
const outputFile = 'bom-rollup.csv'; // Replace with your desired output file path

// Variables to hold data
let rows = [];

// Read the CSV file, skipping the first 6 rows
let lineCount = 0;

// Create a transform stream to replace \" with ""
const replaceQuotesStream = new Transform({
  transform(chunk, encoding, callback) {
    // Replace \" with ""
    const modifiedChunk = chunk.toString().replace(/\\"/g, '""');
    callback(null, modifiedChunk);
  }
});

fs.createReadStream(inputFile)
  .pipe(replaceQuotesStream) // Apply the replace transform before parsing
  .pipe(csv({ separator: '\t', relax_quotes: false}))
  .on('data', (data) => {
    console.log(data);
    lineCount++;
    rows.push(data);
  })
  .on('end', () => {
    //console.log('Rows read from CSV:', rows);

    // Remove rows where 'Label' is undefined or starts with '_'
    rows = rows.filter(row => row.Label && !row.Label.startsWith('_') && !row.Label.startsWith('SOLID') && !row.Label.startsWith('COMPOUND'));
    console.log('Rows after filtering:', rows);

    // Process 'Label' field
    rows = rows.map(row => {
      let label = row.Label;

      //remove bad quotes
      label = label.replace(/\\"/g, '"');

      // Remove version number at the end (format 'v###')
      label = label.replace(/ v\d+$/, '');

      // Remove extra numbers at the end (format '###')
      label = label.replace(/00\d$/, '');

      // Initialize 'Part Number' field
      let partNumber = ' ';
      let manufacturer = ' ';

      // If 'Label' contains ' - ', split and get second part
      if (label.includes(' - ')) {
        const parts = label.split(' - ');
        label = parts[0];
        manufacturer = parts[1];
        
        if (manufacturer.includes(': ')) {
          const manudata = manufacturer.split(': ');
          manufacturer = manudata[0];
          partNumber = manudata[1];
        }
      }

      row.Label = label;
      row['Part Number'] = partNumber;
      row['Manufacturer'] = manufacturer;

      return row;
    });

    // Roll up data to unique 'Label' fields and sum 'Qty'
    const rolledUpData = {};

    rows.forEach(row => {
      const key = row.Label;
      console.log(key);
      if (!rolledUpData[key]) {
        rolledUpData[key] = { Qty: 1, Name: key, "Part Number": row['Part Number'], Manufacturer: row.Manufacturer};
      } else {
        rolledUpData[key].Qty++;
      }
    });

    const resultRows = Object.values(rolledUpData);

    resultRows.sort((a, b) => {
      if (a.Manufacturer < b.Manufacturer) {
        return -1; // a comes before b
      }
      if (a.Manufacturer > b.Manufacturer) {
        return 1;  // a comes after b
      }
      return 0;    // a and b are equal
    });
    
    console.log(resultRows);

    // Write the result to a new CSV file
    const csvWriter = createCsvWriter({
      path: outputFile,
      header: Object.keys(resultRows[0]).map(field => ({ id: field, title: field })),
      fieldDelimiter: ','
    });

    csvWriter.writeRecords(resultRows)
      .then(() => {
        console.log('CSV file written successfully');
      });
  });
