/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import CsvDownloader from 'react-csv-downloader';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import logo from '../../../../../assets/logo.png'
import { Form, Select } from 'antd';
const { Option } = Select;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 5,
  },
  section: {
    margin: 5,
    flexGrow: 1,
  },
  headerBox: {
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    paddingBottom:20,

  },

  headerLogo:{
    width:150,
    height:50,
  },

  headerText: {
    fontSize: 12,
    fontWeight:"ultrabold",
    textAlign: 'center',
    marginTop:10,
    textTransform:"uppercase"
  },

  totalText: {
    fontSize: 10,
    marginBottom:10
  },
  title: {
    fontSize:12,
    fontWeight: 800,
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,

  },
  tableCellTitle: {
    flex: 1,
    padding: 5,
    fontSize:8,
    backgroundColor:"#3b3b3b",
    fontWeight:"semibold",
    color:"#fff"
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize:8,

  },
});

export default function ExportFiles({ companyData, totalOfCompany }) {

  const generateXLSXData = () => {
    const worksheet = XLSX.utils.json_to_sheet(generateCSVData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sponsors/Exhibitors Data');
    const xlsxBuffer = XLSX.write(workbook, { type: 'buffer' });
    return xlsxBuffer;
  };
  

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const generateCSVData = () => {
    const csvData = companyData.map(item => ({
      DateTime: item.created_at ? formatDate(item.created_at) : "N/A",
      Name: item?.name || "N/A",
      Email: item?.email || "N/A",
      TypeName: item?.company_org_type_details?.name || "N/A",
      Address: item?.address || "N/A",
      PhoneNo: item?.phone || "N/A",
      Telephone: item?.telephone || "N/A",
      website: item?.website || "N/A",
    }));
    return csvData;
  };

  const generatePDFData = () => (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        <View style={styles.section}>
          <View style={styles.headerBox}>
            <Image src={logo} style={styles.headerLogo} />
          <Text style={styles.headerText}>List of Sponsors/Exhibitors </Text>
          </View>
          <View>
            <Text style={styles.totalText}>Total: {totalOfCompany}</Text>
          </View>
          <View  style={styles.tableRow}>
            <Text style={styles.tableCellTitle}>Date/Time</Text>
            <Text style={styles.tableCellTitle}>Name</Text>
            <Text style={styles.tableCellTitle}>Email</Text>
            <Text style={styles.tableCellTitle}>Type</Text>
            <Text style={styles.tableCellTitle}>Address</Text>
            <Text style={styles.tableCellTitle}>Phone Number</Text>
            <Text style={styles.tableCellTitle}>Website</Text>
            </View>

          {companyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.created_at ? formatDate(item.created_at) : "N/A"}</Text>
              <Text style={styles.tableCell}>{item.name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.email || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.company_org_type_details?.name || "N/A"}</Text>
              <Text style={styles.tableCell}>{item?.address || "N/A"}</Text>
              <Text style={styles.tableCell}>{item.phone || "N/A"}</Text>
              <Text style={styles.tableCell}>{item.telephone || "N/A"}</Text>
              <Text style={styles.tableCell}>{item.website || "N/A"}</Text>
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );


  

  return (
        <Select placeholder='Select To Export' className='exportFiles'>
            <Option value="CSV">
                <CsvDownloader
                    filename="Sponsors/Exhibitors.csv"
                    separator=","
                    datas={generateCSVData()}
                    wrapColumnChar={'"'}
                    >
                <button>Export as CSV</button>
                </CsvDownloader>
            </Option>
        
        <Option value="PDF">
            <PDFDownloadLink document={generatePDFData()} fileName="Sponsors/Exhibitors.pdf">
             <button>Export as PDF</button>
            </PDFDownloadLink>  
        </Option>

        <Option value="XLSX">
        <button onClick={() => {
            const xlsxData = generateXLSXData();
            const blob = new Blob([xlsxData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Sponsors/Exhibitors.xlsx';
            a.click();
            URL.revokeObjectURL(url);
            }}>Export as XLSX
        </button>
        </Option>

        </Select>
  );
}
