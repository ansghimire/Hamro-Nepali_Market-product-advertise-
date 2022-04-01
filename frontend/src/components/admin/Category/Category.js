import React from 'react'
import AddCategory from './AddCategory'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, TablePagination,
    TextField, Button
} from '@mui/material/';
import { useGetCategoryQuery, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../../services/categoryApi'
import { useAuth } from '../../../utils/auth'

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 600
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#1565c0',
        color: 'black',
        maxWidth: 100
    }
}));


function Category() {

    const [editId, setEditId] = React.useState(null)
    const [editVal, setEditVal] = React.useState(null)
    const [errors, setError] = React.useState({ editCategory: '' })
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const auth = useAuth()




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // fetching data
    const { data, isFetching } = useGetCategoryQuery();

    // for deleting data
    const [deleteCategory, responseInfo] = useDeleteCategoryMutation()
    // for updating data
    const [updateCategory] = useUpdateCategoryMutation()

    if (isFetching || responseInfo.isLoading) return 'Loading.....';



    let i = 1
    const rows = [];
    data.forEach(element => {
        rows.push({ 'id': i++, 'category_id': element.category_id, 'category_name': element.category_name });
    });


    const edit_data = (id, value) => {
        setEditId(id);
        setEditVal(value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editVal === '') {
            setError({ editCategory: 'Required' })
            return
        } else if (editVal.length <= 3) {
            setError({ editCategory: 'Must be greater than 3 characters' })
            return
        } else if (editVal.length >= 15) {
            setError({ editCategory: 'Must be less than 15 characters' })
            return
        } else {
            if (auth.access) {
                updateCategory({ id: editId, category_name: editVal, access:auth.access })
            }


            setEditId('')
            setEditVal('')

            setError({ editCategory: '' })

        }
    }

    return (
        <div>
            <AddCategory />
            <div>
                {errors.editCategory === '' ? null :

                    <Typography color="error.main">{errors.editCategory}
                    </Typography>
                }
                <Paper className={classes.tableContainer}>
                    <TableContainer>
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>Category Id</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="center">Category Name</TableCell>
                                    <TableCell className={classes.tableHeaderCell} align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle1">{row.id}</Typography>
                                        </TableCell>
                                        {/* our logic */}

                                        <TableCell align="right">
                                            {
                                                editId !== null && editId === row.category_id ?
                                                    <form onSubmit={handleSubmit} >
                                                        <TextField variant="standard"
                                                            name="editCategory"
                                                            id="editCategory"
                                                            value={editVal}
                                                            onChange={(e) => setEditVal(e.target.value)}
                                                        />
                                                        <Button variant="contained" type="submit" size="small">Update</Button>
                                                    </form> :
                                                    <Typography variant="subtitle1" align="center"> {row.category_name}</Typography>


                                            }
                                        </TableCell>

                                        <TableCell align="center">

                                            {<EditIcon onClick={() => edit_data(row.category_id, row.category_name)}
                                                color="secondary" fontSize="medium" style={{ cursor: "pointer" }} />}
                                            {<DeleteIcon onClick={() => deleteCategory({id:row.category_id, access: auth.access})}
                                                color="warning"
                                                fontSize="medium"
                                                style={{ cursor: "pointer", marginLeft: "13px" }} />}

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>
        </div>
    )
}

export default Category
