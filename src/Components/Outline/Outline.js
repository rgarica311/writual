/*import React from 'react'
import WritualContext from '../../WritualContext'
//import { Font, Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
//import { PDFViewer } from '@react-pdf/renderer';

// Create styles
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    marginBottom: 300,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});


// Create Document Component
export default function Outline(){
  return (
    <WritualContext.Consumer>
    {(context) => (
    <PDFViewer>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~ Created with Writual Outline Generator ~
          </Text>
          <Text style={styles.title}>{context.title.value}</Text>
          <Text style={styles.author}>By: {context.author.value}</Text>
          <Text style={styles.author}>Format: {context.format.value}</Text>
          <Text style={styles.author}>Genre: {context.genre.value}</Text>
          <Text style={styles.author}>Logline: {context.logline.value}</Text>
          {
            context.steps.map(obj => (
              <Text key={obj.step_name} style={styles.subtitle}>{obj.step_name}</Text>
          ))
          }
          {

        
          context.steps.map(obj => (
            <Text key={obj.id} style={styles.text}>{obj.step_desc}</Text>
          ))

          }

          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
      </Page>
      </Document>
    </PDFViewer>
  )}
</WritualContext.Consumer>
  )
}*/
