import React from 'react';
import { saveAs } from 'file-saver';
import { transcription, summarization } from './api';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.fonts = {
  NotoSans: {
    normal: 'NotoSans-Regular.ttf',
    bold: 'NotoSans-Bold.ttf',
    italics: 'NotoSans-Italic.ttf',
    bolditalics: 'NotoSans-BoldItalic.ttf'
  }
};



export const handle_Download_Transcription_Txt = () => {
    const blob = new Blob([transcription], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcription.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

export const handle_Download_Transcription_Pdf = (language_transcription) => {
  const alignment = (language_transcription === "he" || language_transcription === "ru") ? "right" : "left";

  const docDefinition = {
    content: [
      {
        text: transcription,
        alignment,
        fontSize: 14,
        rtl: language_transcription === "he"
      }
    ],
    defaultStyle: {
      font: "NotoSans"
    }
  };

  pdfMake.createPdf(docDefinition).download(`transcription_${language_transcription}.pdf`);
};


export  const handle_Download_Transcription_Word = async () => {
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

export  const handle_Download_Summary_Txt = () => {
    const blob = new Blob([summarization], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "summarization.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url); // Clean up
  };

export const handle_Download_Summary_Pdf = (language_summary) => {
  const alignment = (language_summary === "he" || language_summary === "ru") ? "right" : "left";

  const docDefinition = {
    content: [
      {
        text: summarization,
        alignment,
        fontSize: 14,
        rtl: language_summary === "he"
      }
    ],
    defaultStyle: {
      font: "NotoSans"
    }
  };

  pdfMake.createPdf(docDefinition).download(`summarization_${language_summary}.pdf`);
};
export  const handle_Download_Summary_Word = async () => {
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
