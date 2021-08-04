import Box from "@material-ui/core/Box"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Alert from "@material-ui/core/Alert"
import Button from "@material-ui/core/Button"

import AdminLayout from "@l/AdminLayout"
import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import moment from "moment"
import CreateModat from "./CreateModat.js"
import DeleteConfirmModal from "@c/Admin/DeleteConfirmModal"
import EditModal from "./EditModal"
import AdminTableHead from "@c/Admin/AdminTableHead"
import { usePage } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia"

const useStyles = makeStyles((theme) => ({
  topBtnsWrapp: {
    margin: "15px 0",
  },
  actionButton: {
    "& .MuiButton-root.MuiButton-contained.MuiButton-containedPrimary": {
      margin: "0px 5px",
    },
  },
}))

const headCells = [
  {
    id: "id",
    sortable: true,
    label: "ID",
  },
  {
    id: "name",
    sortable: true,
    label: "Name",
  },
  {
    id: "created_at",
    sortable: true,
    label: "Created at",
  },
  {
    id: "actions",
    sortable: false,
    label: "Actions",
  },
]

const Users = () => {
  const [tagsQuery, setTagsQuery] = useState({
    page: 1,
    perPage: 5,
    direction: "asc",
    sort: "name",
  })

  let { page, perPage, direction, sort } = tagsQuery

  useEffect(() => {
    Inertia.get(route(route().current()), tagsQuery, {
      replace: true,
      preserveState: true,
    })
  }, [tagsQuery])

  const classes = useStyles()

  // Avoid a layout jump when reaching the last page with empty tags.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * perPage - total) : 0

  const {
    items: { data: tags },
    items: { total },
    flash: { success },
    flash: { error },
    errors,
  } = usePage().props

  const handleRequestSort = (event, newSort) => {
    const isAsc = sort === newSort && direction === "asc"
    const newOrder = isAsc ? "desc" : "asc"
    setTagsQuery({
      ...tagsQuery,
      direction: newOrder,
      sort: newSort,
    })
  }

  const handleChangePage = (event, newPage) => {
    setTagsQuery({
      ...tagsQuery,
      page: newPage + 1,
    })
  }

  const handleChangeRowsPerPage = (event) => {
    let perPage = parseInt(event.target.value, 10)
    setTagsQuery({
      ...tagsQuery,
      perPage,
    })
  }

  const dateFormat = (timestamp) => {
    timestamp = parseInt(timestamp)
    return moment(timestamp).format("DD-MM-YYYY:HH:MM")
  }

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [currentRow, setCurrentRow] = useState({})

  const openCreateModalHandler = () => {
    setOpenCreateModal(true)
  }

  const closeCreateModalHandler = () => {
    setOpenCreateModal(false)
  }
  const createSubminHanler = async (values, resetValues) => {
    if (!values.name) {
      return
    }

    Inertia.post(route(route().current()), values, {
      replace: true,
      preserveState: true,
      onSuccess: (r) => {
        setOpenCreateModal(false)
        resetValues()
      },
    })
  }

  const handleOpenDeleteConfirmModal = (row) => {
    setCurrentRow(row)
    setOpenDeleteConfirmModal(true)
  }

  const closeDeleteConfirmModalHandler = () => {
    setOpenDeleteConfirmModal(false)
  }

  const handleDeleteConfirm = async () => {
    Inertia.delete(route("users.destroy", currentRow.id), {
      replace: true,
      preserveState: true,
      onSuccess: (r) => {
        setOpenDeleteConfirmModal(false)
      },
    })
  }

  const handleOpenEditModal = (row) => {
    setCurrentRow(row)
    setOpenEditModal(true)
  }

  const closeEditModalHandler = () => {
    setOpenEditModal(false)
  }

  const handleEditSubmit = async () => {
    Inertia.put(route("users.update", currentRow.id), currentRow, {
      replace: true,
      preserveState: true,
      onSuccess: (r) => {
        setOpenEditModal(false)
      },
    })
  }

  return (
    <AdminLayout title="Users">
      <div></div>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <CreateModat
        errors={errors}
        handleSubmit={createSubminHanler}
        open={openCreateModal}
        handleClose={closeCreateModalHandler}
      />
      <DeleteConfirmModal
        mtitle="Delete tag confirmation"
        currentRow={currentRow}
        handleConfirm={handleDeleteConfirm}
        open={openDeleteConfirmModal}
        handleClose={closeDeleteConfirmModalHandler}
      />

      <EditModal
        setCurrentRow={setCurrentRow}
        currentRow={currentRow}
        handleSubmit={handleEditSubmit}
        open={openEditModal}
        handleClose={closeEditModalHandler}
      />

      <Box sx={{ width: "100%" }}>
        <div className={classes.topBtnsWrapp}>
          <Button variant="contained" onClick={() => openCreateModalHandler()}>
            Create
          </Button>
        </div>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <AdminTableHead
                headCells={headCells}
                order={direction}
                orderBy={sort}
                onRequestSort={handleRequestSort}
                rowCount={tags.length}
              />
              <TableBody>
                {tags.slice().map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell> {row.id}</TableCell>
                      <TableCell> {row.name}</TableCell>
                      <TableCell align="left">{row.created_at}</TableCell>
                      <TableCell className={classes.actionButton}>
                        <Button
                          variant="contained"
                          onClick={() => handleOpenEditModal(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDeleteConfirmModal(row)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={perPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </AdminLayout>
  )
}

export default Users
