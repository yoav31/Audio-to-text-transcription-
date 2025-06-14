import React from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import jsPDF from 'jspdf';

// Robust pdfMake setup with error handling
try {
  if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  } else if (pdfFonts && pdfFonts.vfs) {
    pdfMake.vfs = pdfFonts.vfs;
  } else if (pdfFonts) {
    pdfMake.vfs = pdfFonts;
  }
} catch (error) {
  console.error('Error setting up pdfMake fonts:', error);
}

// Use default fonts - they have better Unicode support
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
};

// Helper function to detect Hebrew text
const containsHebrew = (text) => {
  return /[\u0590-\u05FF]/.test(text);
};

// Helper function to prepare text for PDF
const prepareTextForPdf = (text) => {
  // Clean up text for better PDF rendering
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .normalize('NFC')
    .trim();
};

// Hebrew-specific PDF generation using HTML + Browser Print (perfect Hebrew support!)
const generateHebrewPdf = (title, content, filename) => {
  try {
    // Create a properly formatted HTML page for Hebrew
    const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        
        body {
            font-family: 'Arial', 'David', 'Times New Roman', serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            direction: rtl;
            text-align: right;
            background: white;
            margin: 0;
            padding: 20px;
        }
        
        .title {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        
        .content {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 12px;
            line-height: 1.8;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="title">${title}</div>
    <div class="content">${content}</div>
</body>
</html>`;

    // Create a new window with the Hebrew content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait a moment for content to load, then trigger print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      
      // Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    }, 500);
    
  } catch (error) {
    console.error('Error generating Hebrew PDF:', error);
    throw error;
  }
};

export const handle_Download_Transcription_Txt = (transcription) => {
    const blob = new Blob([transcription], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

export const handle_Download_Transcription_Pdf = (language_transcription, transcription) => {
  console.log('Generating PDF for language:', language_transcription);
  
  const cleanText = prepareTextForPdf(transcription);
  const isHebrew = language_transcription === "he" || containsHebrew(cleanText);
  
  if (isHebrew) {
    // Hebrew: Use jsPDF for better Hebrew support
    try {
      generateHebrewPdf('תמליל - Transcription', cleanText, `transcription_${language_transcription}.pdf`);
    } catch (error) {
      console.error('Error generating Hebrew PDF:', error);
      alert('Error generating Hebrew PDF. Please try again.');
    }
    return;
  }
  
  // For non-Hebrew languages, use pdfMake (works fine)
  let docDefinition;
  
  if (language_transcription === "ru") {
    // Russian
    docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'Transcription - Транскрипция',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: cleanText,
          fontSize: 12,
          alignment: 'left',
          lineHeight: 1.5
        }
      ],
      defaultStyle: {
        fontSize: 12
      }
    };
  } else {
    // English
    docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'Transcription',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: cleanText,
          fontSize: 12,
          alignment: 'left',
          lineHeight: 1.5
        }
      ],
      defaultStyle: {
        fontSize: 12
      }
    };
  }

  try {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(`transcription_${language_transcription}.pdf`);
  } catch (error) {
    console.error('Error creating PDF:', error);
    // Fallback: create a simple PDF without special formatting
    const fallbackDoc = {
      content: [
        { text: 'Transcription', fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        { text: cleanText, fontSize: 12 }
      ]
    };
    pdfMake.createPdf(fallbackDoc).download(`transcription_${language_transcription}.pdf`);
  }
};

export  const handle_Download_Transcription_Word = async (transcription) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(transcription)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "transcription.docx");
  };

export  const handle_Download_Summary_Txt = (summarization) => {
    const blob = new Blob([summarization], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "summarization.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

export const handle_Download_Summary_Pdf = (language_summary, summarization) => {
  console.log('Generating PDF summary for language:', language_summary);
  
  const cleanText = prepareTextForPdf(summarization);
  const isHebrew = language_summary === "he" || containsHebrew(cleanText);
  
  if (isHebrew) {
    // Hebrew: Use jsPDF for better Hebrew support
    try {
      generateHebrewPdf('סיכום - Summary', cleanText, `summary_${language_summary}.pdf`);
    } catch (error) {
      console.error('Error generating Hebrew PDF:', error);
      alert('Error generating Hebrew PDF. Please try again.');
    }
    return;
  }
  
  // For non-Hebrew languages, use pdfMake (works fine)
  let docDefinition;
  
  if (language_summary === "ru") {
    // Russian
    docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'Summary - Резюме',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: cleanText,
          fontSize: 12,
          alignment: 'left',
          lineHeight: 1.5
        }
      ],
      defaultStyle: {
        fontSize: 12
      }
    };
  } else {
    // English
    docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          text: 'Summary',
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          text: cleanText,
          fontSize: 12,
          alignment: 'left',
          lineHeight: 1.5
        }
      ],
      defaultStyle: {
        fontSize: 12
      }
    };
  }

  try {
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download(`summary_${language_summary}.pdf`);
  } catch (error) {
    console.error('Error creating summary PDF:', error);
    // Fallback: create a simple PDF without special formatting
    const fallbackDoc = {
      content: [
        { text: 'Summary', fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
        { text: cleanText, fontSize: 12 }
      ]
    };
    pdfMake.createPdf(fallbackDoc).download(`summary_${language_summary}.pdf`);
  }
};

export  const handle_Download_Summary_Word = async (summarization) => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(summarization)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "summarization.docx");
  };
