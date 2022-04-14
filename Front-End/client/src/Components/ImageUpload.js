import React from 'react'
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useRef, useState} from "react";

function ImageUpload() {

  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  const image = useRef(null);

  const changeHandler = (event) => {

		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const insertImage =  async () => {



    try{

      const formData = new FormData();

		  formData.append('File', selectedFile);

      console.log(selectedFile);

      const body = formData;
      
  
      const response = await fetch("http://localhost:3001/add-gym-picture", {
  
        method: "POST",
        body: selectedFile,
  
      });
    }
    catch(err){
      console.log(err.message)  
    }
    

  }

  return (
    <>
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={changeHandler}/>
            <Button onClick={insertImage}>Save</Button>
        </Form.Group>

    </>
  )
}

export default ImageUpload