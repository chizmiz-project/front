import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

export default function ReportDialog({ open, onClose, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const reason = formData.get('reason');
    onSubmit(reason);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>گزارش آگهی</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup name="reason">
              <FormControlLabel 
                value="fake" 
                control={<Radio />} 
                label="آگهی جعلی است" 
              />
              <FormControlLabel 
                value="inappropriate" 
                control={<Radio />} 
                label="محتوای نامناسب" 
              />
              <FormControlLabel 
                value="spam" 
                control={<Radio />} 
                label="اسپم است" 
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>انصراف</Button>
          <Button type="submit" variant="contained">
            ارسال گزارش
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}