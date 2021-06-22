import React, { useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';


export function Home() {

  const [image, setImage] = useState<Object>(null);
  
  useEffect(()=> {
    console.log(image);
  },[image])

  return ( 
      <>
      
        <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(file) => setImage(file)}
        filesLimit={1}
        >

        </DropzoneArea>
      </>

  );
}
