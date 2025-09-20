import pdf from "pdf-parse";
import React, { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFS from "react-native-fs";
import Tesseract from "tesseract.js";

const FileParser = () => {
  const [parsedData, setParsedData] = useState(null);

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      if (res.type === "application/pdf") {
        // ✅ Read PDF
        const fileData = await RNFS.readFile(res.uri, "base64");
        const pdfBuffer = Buffer.from(fileData, "base64");
        const data = await pdf(pdfBuffer);
        setParsedData({ type: "pdf", text: data.text });
      } else {
        // ✅ Read Image with OCR
        const result = await Tesseract.recognize(res.uri, "eng");
        setParsedData({ type: "image", text: result.data.text });
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Pick PDF / Image" onPress={handlePickFile} />
      <ScrollView style={{ marginTop: 20 }}>
        {parsedData && (
          <Text selectable>{JSON.stringify(parsedData, null, 2)}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FileParser;
