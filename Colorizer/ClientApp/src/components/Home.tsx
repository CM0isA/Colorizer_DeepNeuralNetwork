import React, { useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';
import { ColorizeApiService } from '../services/colorize.api.service';





export function Home() {

  const [image, setImage] = useState<Object>(null);
  const [disabled, setDisabled] = useState<boolean>(false)
  const ColorizeService = new ColorizeApiService();
  
  useEffect(() => {
    if(image===null || image===undefined)
      setDisabled(true);
      else setDisabled(false);
  }, [image])


  const saveImage = (savedImage) => {
    const formData = new FormData();
    formData.append('image', savedImage);
    ColorizeService.Colorize(formData);
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

    </div>

  );
}
