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
  const [imageName, setImageName] = useState<string>("")
  const [ converted, setConverted] = useState<boolean>(false)

  useEffect(() => {
    if (image === null || image === undefined)
      setDisabled(true);
    else setDisabled(false);
  }, [image])

  useEffect(() => {
    if (imageName === "" || imageName === undefined)
      setConverted(true);
    else setConverted(false);
  }, [imageName])


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
        setImageName(result.data)
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
      <Button style={{position:'relative', float:'left', marginTop:'10px', marginLeft:'20px'}}
        onClick={() => saveImage(image)}
        variant="contained"
        color='secondary'
        disabled={disabled}
      >
        Convert
      </Button>
      <Button style={{position:'relative', float:'right', marginTop:'10px', marginRight:'20px'}}
        onClick={() => downloadPhoto(imageName)}
        variant="contained"
        color='secondary'
        disabled={converted}
      >
        View Result
      </Button>
    </div>

  );
}
