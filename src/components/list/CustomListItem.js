import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemText, Switch, Checkbox, IconButton, Typography, ListItemIcon } from '@mui/material';

export function CustomListItem(props) {
    const navigate = useNavigate();
    const { label, type, value, icon = null } = props;

    if (type === "navigation") {
        return (
            <ListItem
                secondaryAction={
                    <IconButton edge="end">
                        <ChevronLeft />
                    </IconButton>
                } button onClick={() => navigate(props.to)}>
                <ListItemIcon children={icon}/>
                <ListItemText primary={label} />
            </ListItem>
        );
    }

    if (type === "switch") {
        return (
            <ListItem secondaryAction={
                <Switch
                    edge="end"
                    checked={props.checked}
                    onChange={(e) => props.onCheckedChange(e.target.checked)}
                />
            }>
                <ListItemIcon children={icon}/>
                <ListItemText  primary={label} />
            </ListItem>
        );
    }

    if (type === "key-value") {
        return (
            <ListItem secondaryAction={
                <Typography variant='subtitle1'>{value}</Typography>
            }>
                <ListItemIcon children={icon}/>
                <ListItemText primary={label} />
            </ListItem>
        );
    }

    return (
        <ListItem secondaryAction={
            <Checkbox
                edge="end"
                checked={props.checked}
                onChange={(e) => props.onCheckedChange(e.target.checked)}
            />
        }>
            <ListItemIcon children={icon}/>
            <ListItemText primary={label} />

        </ListItem>
    );
}

