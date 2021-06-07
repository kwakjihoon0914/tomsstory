

import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect } from "react";
import { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import ContentService from '../services/ContentService';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import HTMLEditor from '../components/editor/HTMLEditor';
import { useHistory } from 'react-router';
const useStyles = makeStyles(theme => ({
    editorContainer: {
        margin: 5
    },
    titleInput: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    titleInputWrapper: {
        margin: 5,
        marginLeft: 10, marginRight: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    selectBox: {
        margin: 5,
        marginLeft: 10

    },
    inputBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",

    },
    editorGrid: {
        padding: 15
    }
}))


const ContentEditor = () => {
    const classes = useStyles();
    const [menus, setMenus] = useState([]);

    const [text, setText] = useState("**Hello world!!!**");
    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState();
    const [menuId, setMenuId] = useState();
    const [type, setType] = useState("md");

    const history = useHistory();


    const handleChangeText = (e) => {
        setText(e.target.value)
    }
    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeSubtitle = (e) => {
        setSubTitle(e.target.value)
    }
    const handleChangeMenuId = (e) => {
        setMenuId(e.target.value)
    }
    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    const handlerSubmit = () => {

        let form = { title, subTitle, text, menu: { id: menuId }, type };
        ContentService.createContent(form).then((res) => {
            history.push(`/blogs/${res.data.id}`);
        }).catch((e) => {
            alert("ERROR")
        })

        console.log(form)

    }

    const fetchMenus = async () => {
        try {
            let fetchedMenus = (await ContentService.getAllMenus()).data;
            fetchedMenus = fetchedMenus.filter((m) => m.type == "MENU");
            setMenus(fetchedMenus);
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchMenus();
    }, [])


    return (
        <>
            <div className={classes.selectBox} >
                <FormControl className={classes.selectBox} required >
                    <InputLabel htmlFor="menu-native-required">Menu</InputLabel>
                    <Select
                        inputProps={{
                            id: 'menu-native-required',
                        }}
                        onChange={handleChangeMenuId}
                        native

                        name="menu" >
                        {menus.map((menu) => <option key={menu.id} value={menu.id}>{menu.name}</option>)}
                    </Select>
                </FormControl>

                <FormControl className={classes.selectBox} required >
                    <InputLabel htmlFor="type-native-required">Type</InputLabel>
                    <Select
                        inputProps={{
                            id: 'type-native-required',
                        }}
                        onChange={handleChangeType}
                        native
                        name="type" >
                        <option value={"md"}>Markdown</option>
                        <option value={"html"}>HTML</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <input name={"thumbnail"} type='file' />
                    </Button>
                </FormControl>
            </div>

            <div className={classes.inputBox}>
                <div className={classes.titleInputWrapper}>
                    <TextField
                        className={classes.titleInput}
                        onChange={handleChangeTitle}
                        label="Title"
                        fullWidth
                        margin="normal"
                        inputProps={{ style: { padding: 8 } }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={classes.titleInputWrapper}>
                    <TextField
                        className={classes.titleInput}
                        onChange={handleChangeSubtitle}
                        label="Sub Title"
                        fullWidth
                        margin="normal"
                        inputProps={{ style: { padding: 8 } }}
                        InputLabelProps={{
                            shrink: true,

                        }}
                        variant="outlined"
                    />
                </div>
            </div>
            <Grid container>
                <Grid className={classes.editorGrid} item xs={12}>
                    <Box border={1} borderColor="primary.main" borderRadius={5} padding={2}>
                        <textarea style={{ width: "100%", height: 300 }} onChange={handleChangeText}>{text}</textarea>
                        {/* {type == "md"
                            ? <MarkdownEditor defaultContent={text} handleChange={handleChangeText} />
                            : <HTMLEditor defaultContent={text} handleChange={handleChangeText} />
                        } */}
                    </Box>
                </Grid>
            </Grid>

            <div className={classes.inputBox}>
                <Button onClick={handlerSubmit} variant="contained" color="primary">save</Button>
            </div>

        </>
    );
}

export default ContentEditor;