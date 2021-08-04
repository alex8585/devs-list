import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import React from "react"
import useFormValues from "@h/useFormValues"

import { usePage } from "@inertiajs/inertia-react"
import Alert from "@material-ui/core/Alert"
import Switch from "@material-ui/core/Switch"
export default function CreateModat({ open, handleClose, handleSubmit }) {
  const [values, handleChange, setValues, resetFormValues] = useFormValues({
    name: "",
    email: "",
    password: "",
    is_admin: "",
  })

  const {
    flash: { success },
    flash: { error },
    errors,
  } = usePage().props

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new User</DialogTitle>
        {Object.keys(errors).length !== 0 && (
          <Alert severity="error">
            {Object.keys(errors).map((keyName, i) => (
              <span key={i}>{errors[keyName]}</span>
            ))}
          </Alert>
        )}
        <DialogContent>
          <TextField
            onChange={(e) => handleChange(e)}
            name="name"
            margin="dense"
            id="name"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            name="email"
            margin="dense"
            id="email"
            label="User email"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            name="password"
            margin="dense"
            id="name"
            label="password"
            type="text"
            fullWidth
            variant="standard"
          />

          <Switch
            label="Admin"
            name="is_admin"
            onChange={(e) => handleChange(e)}
            inputProps={{ "aria-label": "controlled" }}
          />

          {/* <TextField
            onChange={(e) => handleChange(e)}
            name="is_admin"
            margin="dense"
            id="name"
            label="Admin ?"
            type="text"
            fullWidth
            variant="standard"
          /> */}
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
