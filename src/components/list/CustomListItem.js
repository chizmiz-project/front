import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemText, Switch, Checkbox, IconButton, Typography, ListItemIcon } from '@mui/material';

export function CustomListItem(props) {
    const navigate = useNavigate();
    const { label, type, value, icon = null, disabled = false } = props;

    const textStyle = disabled ? { color: 'rgba(0, 0, 0, 0.38)' } : {};

    if (type === "navigation") {
        return (
            <ListItem
                disabled={disabled}
                secondaryAction={
                    <IconButton edge="end" disabled={disabled}>
                        <ChevronLeft />
                    </IconButton>
                }
                button
                onClick={() => !disabled && navigate(props.to)}
            >
                <ListItemIcon children={icon} />
                <ListItemText primary={label} style={textStyle} />
            </ListItem>
        );
    }

    if (type === "switch") {
        return (
            <ListItem
                disabled={disabled}
                secondaryAction={
                    <Switch
                        edge="end"
                        checked={props.checked}
                        onChange={(e) => props.onCheckedChange(e.target.checked)}
                        disabled={disabled}
                    />
                }
            >
                <ListItemIcon children={icon} />
                <ListItemText primary={label} style={textStyle} />
            </ListItem>
        );
    }

    if (type === "key-value") {
        return (
            <ListItem disabled={disabled} secondaryAction={<Typography variant="subtitle1" style={textStyle}>{value}</Typography>}>
                <ListItemIcon children={icon} />
                <ListItemText primary={label} style={textStyle} />
            </ListItem>
        );
    }

    return (
        <ListItem
            disabled={disabled}
            secondaryAction={
                <Checkbox
                    edge="end"
                    checked={props.checked}
                    onChange={(e) => props.onCheckedChange(e.target.checked)}
                    disabled={disabled}
                />
            }
        >
            <ListItemIcon children={icon} />
            <ListItemText primary={label} style={textStyle} />
        </ListItem>
    );
}
