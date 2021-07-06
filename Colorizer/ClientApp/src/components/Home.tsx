import React, { useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import { ColorizeApiService } from '../services/colorize.api.service';
import { PhotoApiService } from '../services/photo.api.service'



export function Home() {

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState<boolean>(false)
  const ColorizeService = new ColorizeApiService();
  const PhotoService = new PhotoApiService();
  const [resp, setResp] = useState<string>("something")

  useEffect(() => {
    if (image === null || image === undefined)
      setDisabled(true);
    else setDisabled(false);
  }, [image])

  function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}



  const downloadPhoto = async (url) => {
    await PhotoService.downloadPhoto(url)
    .then((result) => {
      var element = document.createElement("a");
      var file = new Blob([result.data], {type: "image/png"});
      element.href = window.URL.createObjectURL(file);
      document.body.appendChild(element);
      element.click()
    })
  } 

  const saveImage = async (savedImage) => {
    const formData = new FormData();
    formData.append('image', savedImage);
    await ColorizeService.Colorize(formData)
      .then((result) => {
        setResp(result.data)
      })

  }

  return (
    <div>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(file) => setImage(file[0])}
        filesLimit={1}

      >

      </DropzoneArea>
      <Button
        onClick={() => saveImage(image)}
        variant="contained"
        color='secondary'
        disabled={disabled}
      >
        Convert
      </Button>
      <Button
        onClick={() => downloadPhoto(resp)}
        variant="contained"
        color='secondary'
      >
        Download
      </Button>
    </div>

  );
}
