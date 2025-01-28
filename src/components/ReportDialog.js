import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField } from '@mui/material';
import ApiService from '../services/Api';
import { useSnackbar } from '../context/SnackbarProvider';

export default function ReportDialog({ open, onClose, onSubmit, adId }) {
  const [formData, setFormData] = useState({ reason: '', description: '' });
  const [descriptionErrorText, setDescriptionErrorText] = useState('');
  const {openSnackbar} = useSnackbar()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.description.trim()) {
      setDescriptionErrorText('لطفاً توضیحات خود را وارد کنید.');
      return;
    }

    try {
      const response = await ApiService.post('/report/', {
        reason: formData.reason,
        description: formData.description,
        advertisement: adId,
      });

      if (response.isSuccess) {
        onSubmit(formData); // Notify the parent component
        openSnackbar("گزارش با موفقیت ارسال شد.", 'success');
      } else {
        openSnackbar('خطا در ارسال گزارش', 'error')
        console.error('Failed to submit report:', response);
      }
    } catch (error) {
      openSnackbar('خطا در ارسال گزارش', 'error')
      console.error('Error while submitting report:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>گزارش آگهی</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              name="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            >
              <FormControlLabel value="fake" control={<Radio />} label="آگهی جعلی است" />
              <FormControlLabel value="inappropriate" control={<Radio />} label="محتوای نامناسب" />
              <FormControlLabel value="spam" control={<Radio />} label="اسپم است" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            label="توضیحات"
            multiline
            minRows={4}
            placeholder="متن را وارد کنید"
            helperText={descriptionErrorText}
            error={descriptionErrorText !== ''}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setDescriptionErrorText('');
            }}
            margin="normal"
          />
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
