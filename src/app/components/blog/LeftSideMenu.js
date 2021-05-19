import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useRef, useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Collapse, Icon } from '@material-ui/core';

// https://react-icons.github.io/react-icons/icons?name=io5
import { FaJava, FaDatabase, FaChrome, FaReact, FaServer, FaHome } from 'react-icons/fa';
import { IoLogoJavascript, IoCodeSlashOutline } from "react-icons/io5";
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { SiSpring, SiApachemaven } from "react-icons/si";
import CommonStyle from '../../styles/CommonStyle';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({

    menuContainer: {
        width: '100%',
    },
    drawer: {
        width: theme => `${theme.menuWidth}px`,
        flexShrink: 0,
    },
    drawerPaper: {
        width: theme => `${theme.menuWidth}px`,
    },
    drawerContainer: {
        width: theme => `${theme.menuWidth}px`,
        overflow: 'auto',
    },
    nestedMenu: {
        paddingLeft: theme.spacing(4),
    },
    menuActive: {
        color: theme => theme.menuActive ? CommonStyle.mainColor : "black",
    }
}));

const ListItemWithIcon = ({ active, text, icon, clickHandler, children }) => {
    const classes = useStyles({ menuActive: active });
    return (
        <ListItem button onClick={clickHandler}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText className={classes.menuActive} primary={text} />
            {children}
        </ListItem>
    )
}
const NestedItemWithIcon = ({ active, text, icon, clickHandler, isCollapse, children }) => {
    const classes = useStyles({ menuActive: active });
    return (
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nestedMenu} onClick={clickHandler}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText className={classes.menuActive} primary={text} />
                </ListItem>
            </List>
        </Collapse>
    )
}
const LeftSideMenu = ({ menuWidth ,contents}) => {
    const classes = useStyles({ menuWidth });
    const [menuCollapses, setMenuCollapses] = useState({
        "java": false, "js": false, "db": false
    });
    const [activateMenu, setActivateMenu] = useState("");
    
    const history = useHistory();
    const linkTo = useCallback((link) => {
        setActivateMenu(link);
        history.push(`/blogs/${link}/last`);
    }, [history]);

    const getCntByMenu = (menu) =>{
        let arr = [];
        if (contents) arr = contents;
        return arr.filter( content => content.menu == menu).length;
    }
    const toggleCollapseMenu = (item) => {
        //1. children 메뉴 떨어뜨리자
        let copied = { ...menuCollapses };
        copied[item] = !copied[item];
        setMenuCollapses(copied);

        //2. toggle 메뉴의 활성상태 변경해줌
        if (copied[item]) {
            setActivateMenu(item + ".")
        } else {
            setActivateMenu("empty")
        }
    }


    return (
        <Drawer className={classes.drawer} variant="permanent" >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List className={classes.menuContainer} component="nav">
                    {/* 0. Home */}
                    <ListItemWithIcon active={activateMenu === "home"} text={"Home"} icon={<FaHome size={25} />} clickHandler={() => linkTo( "home")} />
                    <Divider />

                    {/* 1.Java */}
                    <ListItemWithIcon active={activateMenu.startsWith("java.")} text={"Java "+getCntByMenu("java")} icon={<FaJava size={25} />} clickHandler={() => toggleCollapseMenu("java")}>
                        {menuCollapses.java ? <ExpandLess /> : <ExpandMore />}
                    </ListItemWithIcon>
                    <NestedItemWithIcon active={activateMenu === "java.dev"} isCollapse={menuCollapses.java} text={"Dev"} icon={<IoCodeSlashOutline size={20} />} clickHandler={() => linkTo("java.dev")} />
                    <NestedItemWithIcon active={activateMenu === "java.spring"} isCollapse={menuCollapses.java} text={"Spring"} icon={<SiSpring size={20} />} clickHandler={() => linkTo("java.spring")} />
                    <NestedItemWithIcon active={activateMenu === "java.maven_gradle"} isCollapse={menuCollapses.java} text={"Maven/Gradle"} icon={<SiApachemaven size={20} />} clickHandler={() => linkTo("java.maven_gradle")} />


                    {/* 2. Javascript */}
                    <ListItemWithIcon active={activateMenu.startsWith("js.")} text={"Javascript"} icon={<IoLogoJavascript size={25} />} clickHandler={() => toggleCollapseMenu("js")}>
                        {menuCollapses.js ? <ExpandLess /> : <ExpandMore />}
                    </ListItemWithIcon>
                    <NestedItemWithIcon active={activateMenu === "js.dev"} isCollapse={menuCollapses.js} text={"Dev"} icon={<IoCodeSlashOutline size={20} />} clickHandler={() => linkTo( "js.dev")} />
                    <NestedItemWithIcon active={activateMenu === "js.react"} isCollapse={menuCollapses.js} text={"React"} icon={<FaReact size={20} />} clickHandler={() => linkTo("js.react")} />
                    <NestedItemWithIcon active={activateMenu === "js.web"} isCollapse={menuCollapses.js} text={"Web"} icon={<FaChrome size={20} />} clickHandler={() => linkTo("js.web")} />

                    {/* 3. DB */}
                    <ListItemWithIcon active={activateMenu === "db"} text={"DB"} icon={<FaDatabase size={25} />} clickHandler={() => linkTo("db")} />
                    {/* 4. Server */}
                    <ListItemWithIcon active={activateMenu === "server"} text={"Server"} icon={<FaServer size={25} />} clickHandler={() => linkTo("server")} />

                </List>


            </div>
        </Drawer>
    )
}


export default LeftSideMenu;