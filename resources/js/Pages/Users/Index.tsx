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
import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react"
import { makeStyles } from "@material-ui/styles"
import moment from "moment"
import CreateModat from "./CreateModal"
import DeleteConfirmModal from "@c/Admin/DeleteConfirmModal"
import EditModal from "./EditModal"
import AdminTableHead from "@c/Admin/AdminTableHead"
import { usePage } from "@inertiajs/inertia-react"
import { Inertia, RequestPayload, Page, ActiveVisit } from "@inertiajs/inertia"

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

let timeout: NodeJS.Timeout

const Users = () => {
  const [tagsQuery, setTagsQuery] = useState({
    page: 1,
    perPage: 5,
    direction: "desc",
    sort: "id",
  })

  const [showErorrs, setShowErrors] = useState(false)

  function handleShowErrors() {
    if (timeout) {
      clearTimeout(timeout)
    }
    setShowErrors(true)
    timeout = setTimeout(() => {
      setShowErrors(false)
    }, 5000)
  }

  let { page, perPage, direction, sort } = tagsQuery

  useEffect(() => {
    Inertia.get(route(route().current()), tagsQuery, {
      replace: true,
      preserveState: true,
    })
  }, [tagsQuery])

  const classes = useStyles()

  let {
    items: { data: tags },
    items: { total },
    flash: { success },
    flash: { error },
    errors,
  } = usePage().props as PagePropsType

  // Avoid a layout jump when reaching the last page with empty tags.
  const emptyRows = page > total / perPage ? perPage - (total % perPage) : 0

  const handleRequestSort = (
    event: ChangeEvent<HTMLInputElement>,
    newSort: string
  ) => {
    const isAsc = sort === newSort && direction === "asc"
    const newOrder = isAsc ? "desc" : "asc"
    setTagsQuery({
      ...tagsQuery,
      direction: newOrder,
      sort: newSort,
    })
  }

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setTagsQuery({
      ...tagsQuery,
      page: newPage + 1,
    })
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    let perPage = parseInt(event.target.value, 10)
    setTagsQuery({
      ...tagsQuery,
      perPage,
    })
  }

  const dateFormat = (timestamp: string) => {
    let intTimestamp = parseInt(timestamp)
    return moment(intTimestamp).format("DD-MM-YYYY:HH:MM")
  }

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const [currentRow, setCurrentRow]: [
    UserInterface,
    React.Dispatch<React.SetStateAction<{}>>
  ] = useState({})

  const openCreateModalHandler = () => {
    setShowErrors(false)
    setOpenCreateModal(true)
  }

  const closeCreateModalHandler = () => {
    setOpenCreateModal(false)
  }

  const createSubmitHanler = async (
    values: UserInterface,
    resetValues: () => void
  ) => {
    let data = values as RequestPayload

    Inertia.post(route(route().current()), data, {
      replace: true,
      preserveState: true,
      onSuccess: (page: Page) => {
        setOpenCreateModal(false)
        resetValues()
      },
      onFinish: (visit: ActiveVisit) => {
        handleShowErrors()
      },
    })
  }

  const handleOpenDeleteConfirmModal = (row: UserInterface) => {
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
      onSuccess: (page: Page) => {
        setOpenDeleteConfirmModal(false)
      },
      onFinish: (visit: ActiveVisit) => {
        handleShowErrors()
      },
    })
  }

  const handleOpenEditModal = (row: UserInterface) => {
    setShowErrors(false)
    setCurrentRow(row)
    setOpenEditModal(true)
  }

  const closeEditModalHandler = () => {
    setOpenEditModal(false)
  }

  const handleEditSubmit = async () => {
    let data = currentRow as RequestPayload
    Inertia.put(route("users.update", currentRow.id), data, {
      replace: true,
      preserveState: true,
      onSuccess: (page: Page) => {
        setOpenEditModal(false)
      },
      onFinish: (visit: ActiveVisit) => {
        handleShowErrors()
      },
    })
  }

  return (
    <AdminLayout title="Users">
      {showErorrs && error && <Alert severity="error">{error}</Alert>}
      {showErorrs && success && <Alert severity="success">{success}</Alert>}

      <CreateModat
        errors={errors}
        showErorrs={showErorrs}
        handleSubmit={createSubmitHanler}
        open={openCreateModal}
        handleClose={closeCreateModalHandler}
      />

      <DeleteConfirmModal
        title="Delete user confirmation"
        currentRow={currentRow}
        handleConfirm={handleDeleteConfirm}
        open={openDeleteConfirmModal}
        handleClose={closeDeleteConfirmModalHandler}
      />

      <EditModal
        errors={errors}
        showErorrs={showErorrs}
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
                onRequestSort={(
                  e: ChangeEvent<HTMLInputElement>,
                  sort: string
                ) => handleRequestSort(e, sort)}
                rowCount={tags.length}
              />
              <TableBody>
                {tags.slice().map((row: UserInterface, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                      height: 69.5 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={4} />
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
            onPageChange={(e, newPage) => {
              handleChangePage(e, newPage)
            }}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </AdminLayout>
  )
}

export default Users
