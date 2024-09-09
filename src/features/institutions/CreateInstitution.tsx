import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Institution } from '../../types/types.Institution';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import FileInput from '../../components/FileInput/FileInput.tsx';

const CreateInstitution = () => {
  const [state, setState] = useState<Institution>({
    name: '',
    description: '',
    image: '',
    schedule: [
      { day: 'Пн', open: true },
      { day: 'Вт', open: true },
      { day: 'Ср', open: true },
      { day: 'Чт', open: true },
      { day: 'Пт', open: true },
      { day: 'Сб', open: false },
      { day: 'Вс', open: false },
    ],
    workingHours: {
      start: dayjs('00:00', 'HH:mm'),
      finish: dayjs('00:00', 'HH:mm'),
    },
    address: '',
    coordinates: [0, 0],
  });

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeChange = (name: 'start' | 'finish', value: Dayjs | null) => {
    if (value) {
      setState((prevState) => ({
        ...prevState,
        workingHours: {
          ...prevState.workingHours,
          [name]: value,
        },
      }));
    }
  };

  const handleScheduleChange = (index: number) => {
    setState((prevState) => ({
      ...prevState,
      schedule: prevState.schedule.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item //находит по индексу и изменяет содержимое ключа open
      ),
    }));
  };

  const fileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 8 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            required
            label="Название заведение"
            name="name"
            type="text"
            value={state.name}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Описание"
            name="description"
            type="text"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            required
            label="Адрес заведение"
            name="address"
            type="text"
            value={state.address}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={8}>
          <FileInput name="image" label="Картина" onChange={fileInputChangeHandler} />
        </Grid>
        <Grid item xs={8}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Начало рабочего дня"
              value={state.workingHours.start}
              onChange={(value) => handleTimeChange('start', value)}
              ampm={false}
            />
            <TimePicker
              label="Конец рабочего дня"
              value={state.workingHours.finish}
              onChange={(value) => handleTimeChange('finish', value)}
              ampm={false}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
          {state.schedule.map((elem, index) => (
            <FormControlLabel
              key={elem.day}
              control={
                <Checkbox
                  checked={elem.open}
                  onChange={() => handleScheduleChange(index)}
                />
              }
              label={elem.day}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CreateInstitution;
