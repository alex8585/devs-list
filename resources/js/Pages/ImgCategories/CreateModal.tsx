import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import useFormValues from "@h/useFormValues"
import React, { useState } from "react"
import Alert from "@material-ui/core/Alert"
import { Inertia,RequestPayload,Page,ActiveVisit } from "@inertiajs/inertia"
import axios from 'axios';
export default function CreateModat({
  open,
  handleClose,
  handleSubmit,
  errors,
  showErorrs,
}:{
    open:boolean
    handleClose:()=> void
    handleSubmit:(values: UserInterface, resetValues: () => void) => Promise<void>
    showErorrs?:boolean
    errors?:{[key: string]: string}

}) {
  const [values, handleChange, setValues, resetFormValues] = useFormValues({
    name: "",
  })

  const fileInitialValue = {
    url: undefined,
    name: "",
  }

  const [uploadedFile, setUploadedFile] = useState(fileInitialValue)

  const handleChangeFile = async (e:any) => {
    let file = e.target.files[0]
    let data = new FormData();
    data.append("file", file);

    axios.post(route("photos.store-file"), data)
      .then(res => {
        setUploadedFile(res.data)
      })

  }

  console.log(uploadedFile);



  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new Photo</DialogTitle>
        {errors && showErorrs && Object.keys(errors).length !== 0 && (
          <Alert severity="error">
            {errors &&
              Object.keys(errors).map((keyName, i) => (
                <div key={i}>{errors[keyName]}</div>
              ))}
          </Alert>
        )}
        <DialogContent>
          {/* <DialogContentText>Create new tag</DialogContentText> */}
          <TextField
            value={values.name}
            onChange={(e) => handleChange(e)}
            name="name"
            margin="dense"
            id="name"
            label="Tag name"
            type="text"
            fullWidth
            variant="standard"
          />
        <input
            type="hidden"
            name="uploadedFile"
            value={uploadedFile.name}
          ></input>
          {uploadedFile.url && (
            <img
              src={uploadedFile.url}
              alt="Uploaded img"
              width={400}
              height={300}
            />
          )}
          <TextField
            onChange={(e) => handleChangeFile(e)}
            name="img"
            margin="dense"
            id="img"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            value={values.img}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(values, resetFormValues)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
