import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import React from "react"

import Switch from "@material-ui/core/Switch"
export default function EditModal({
  open,
  handleClose,
  handleSubmit,
  currentRow,
  setCurrentRow,
}) {
  const handleChangeRow = (e) => {
    const key = e.target.name
    let value = e.target.value

    if (e.target.type === "checkbox") {
      value = e.target.checked
    }

    setCurrentRow({
      ...currentRow,
      [key]: value,
    })
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit tag</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Create new tag</DialogContentText> */}
          <TextField
            onChange={(e) => handleChangeRow(e)}
            name="name"
            margin="dense"
            id="name"
            label="User name"
            type="text"
            fullWidth
            variant="standard"
            value={currentRow.name}
          />
          <TextField
            onChange={(e) => handleChangeRow(e)}
            name="email"
            margin="dense"
            id="email"
            label="User email"
            type="text"
            fullWidth
            variant="standard"
            value={currentRow.email}
          />
          <TextField
            onChange={(e) => handleChangeRow(e)}
            name="password"
            margin="dense"
            id="password"
            label="password"
            type="text"
            fullWidth
            variant="standard"
            value={currentRow.password ? currentRow.password : ""}
          />{" "}
          {currentRow.is_admin && (
            <Switch
              defaultChecked
              label="Admin"
              value={currentRow.is_admin}
              name="is_admin"
              onChange={(e) => handleChangeRow(e)}
              inputProps={{ "aria-label": "controlled" }}
            />
          )}
          {!currentRow.is_admin && (
            <Switch
              label="Admin"
              value={currentRow.is_admin}
              name="is_admin"
              onChange={(e) => handleChangeRow(e)}
              inputProps={{ "aria-label": "controlled" }}
            />
          )}
          {/* <TextField
            onChange={(e) => handleChangeRow(e)}
            name="is_admin"
            margin="dense"
            id="is_admin"
            label="Admin ?"
            type="text"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
