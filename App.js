/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {FlatList, Image, View} from 'react-native';
import axios from 'axios';
import Base64 from './base64';
import RNFetchBlob from 'rn-fetch-blob';
const RNFS = require('react-native-fs');

const ImageComponent = ({url, index}) => {
  const [imageData, setImageData] = useState(null);
  const fetchImage = async url => {
    try {
      const response = await fetch(url);
      // console.log(response);
      const blob = await response.blob();
      // console.log('data', blob);
      const tempFilePath = `${RNFS.DocumentDirectoryPath}/image.jpg`;
      console.log(tempFilePath, 'is tem path');
      await RNFS.writeFile(tempFilePath, blob._data._blob, 'base64');
      setImageData('file://' + tempFilePath);

      // var blob = new Blob([response], {type: 'image/jpeg'});
      // var imageUrl = URL.createObjectURL(blob);
      // const objectURL = URL.createObjectURL(blob);
      // console.log(objectURL);
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   // console.log(reader.result);
      //   const base64Data = `data:image/jpeg;base64,${reader.result}`;
      //   setImageData(base64Data);
      //   // return reader.result/;
      // };
      // reader.readAsDataURL(blob);
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  useEffect(() => {
    console.log('use effect');
    if (index === 1) {
      setImageData(url);
    } else {
      // RNFetchBlob.fetch('GET', url)
      //   .then(response => {
      //     const base64Data = `${response.data},data:image/jpeg;base64`;
      //     setImageData(base64Data);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching image:', error);
      //   });
      const result = fetchImage(url);
      console.log('result is', result);
      // setImageData(result);
    }
  }, [index, url]);

  return (
    <>
      {imageData && (
        <Image
          style={{width: 300, height: 200, alignSelf: 'center', margin: 10}} // Set the desired dimensions
          source={{uri: imageData}}
        />
      )}
    </>
  );
};

const App = () => {
  const imageUrls = [
    'https://ayae52i9de.execute-api.us-east-1.amazonaws.com/prod/s3?key=elephant-trax/google_103236758783646644108/04252023032040_00148466-6020-496d-879a-01edabd564d1',
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={imageUrls}
        contentContainerStyle={{paddingVertical: 20}}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <ImageComponent url={item} index={index} />
        )}
      />
    </View>
  );
};

export default App;
