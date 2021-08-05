import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import useFormValues from "@h/useFormValues"

import Alert from "@material-ui/core/Alert"
import Switch from "@material-ui/core/Switch"
export default function CreateModat({
  open,
  handleClose,
  handleSubmit,
  showErorrs,
  errors,
}:{
    open:boolean
    handleClose:()=> void
    handleSubmit:(values: UserInterface, resetValues: () => void) => Promise<void>
    showErorrs?:boolean
    errors?:{[key: string]: string}

}) {
  const [values, handleChange, setValues, resetFormValues] = useFormValues({
    name: "",
    email: "",
    password: "",
    is_admin: "",
  })

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new User</DialogTitle>
        {errors && showErorrs && Object.keys(errors).length !== 0 && (
          <Alert severity="error">
            {errors && Object.keys(errors).map((keyName, i) => (
              <div key={i}>{errors[keyName]}</div>
            ))}
          </Alert>
        )}
        <DialogContent>
          <TextField
            value={values.name}
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
            value={values.email}
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
            value={values.password}
            onChange={(e) => handleChange(e)}
            name="password"
            margin="dense"
            id="name"
            label="password"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControlLabel
            control={
              <Switch
                value={values.is_admin}
                name="is_admin"
                onChange={(e) => handleChange(e)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Admin"
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
