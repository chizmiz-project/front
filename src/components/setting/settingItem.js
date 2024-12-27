import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemText, Switch, Checkbox, IconButton } from '@mui/material';

export function SettingsItem(props) {
    const navigate = useNavigate();
    const { label, type } = props;

    if (type === "navigation") {
        return (
            <ListItem
                secondaryAction={
                    <IconButton edge="end">
                        <ChevronLeft />
                    </IconButton>
                } button onClick={() => navigate(props.to)}>

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
            <ListItemText primary={label} />

        </ListItem>
    );
}

