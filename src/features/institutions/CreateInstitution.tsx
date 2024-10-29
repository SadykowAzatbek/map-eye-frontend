import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  debounce,
} from '@mui/material';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { Institution } from '../../types/types.Institution';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch } from '../../app/hooks.ts';
import { createInstitution } from './institutionsThunk.ts';
import axiosApi from '../../utils/axiosApi.ts';
import Search from '../../components/Searchs/Search.tsx';

interface searchTable {
  displayName: string;
  lat: string;
  lon: string;
}

const CreateInstitution = () => {
  const [state, setState] = useState<Institution>({
    name: '',
    description: '',
    schedule: [
      {
        day: 'Понедельник',
        open: true,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Вторник',
        open: true,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Среда',
        open: true,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Четверг',
        open: true,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Пятница',
        open: true,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Суббота',
        open: false,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
      {
        day: 'Воскресенье',
        open: false,
        start: dayjs('00:00', 'HH:mm'),
        finish: dayjs('00:00', 'HH:mm'),
      },
    ],
    address: '',
    coordinates: [0, 0],
  });

  console.log(state);

  const [searchResult, setSearchResult] = useState<searchTable[]>([]);

  const searchStreet = async (query: string) => {
    const response = await axiosApi.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    const filterData = response.data
      .filter((elem) => elem.addresstype === 'building')
      .map((elem) => ({
        displayName: elem.display_name, // Переименование ключа
        lat: elem.lat,
        lon: elem.lon,
      }));

    if (filterData.length > 2) {
      setState((prevState) => ({
        ...prevState,
        coordinates: [
          parseFloat(filterData[0].lat),
          parseFloat(filterData[0].lon),
        ],
      }));
    }
    setSearchResult(filterData);
  };

  const debouncedSearchStreet = debounce(searchStreet, 500);

  useEffect(() => {
    if (state.address) {
      debouncedSearchStreet(state.address);
    }
  }, [state.address]);

  const [everyoneTime, setEveryoneTime] = useState({
    start: dayjs('00:00', 'HH:mm'),
    finish: dayjs('00:00', 'HH:mm'),
  });

  const dispatch = useAppDispatch();

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeChange = (index: number, name: 'start' | 'finish', value: Dayjs | null) => {
    if (value) {
      setState((prevState) => ({
        ...prevState,
        schedule: prevState.schedule.map((item, i) =>
          i === index ? {...item, [name]: value } : item
        ),
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

  const handleSetTimeEveryone = (name: 'start' | 'finish', value: Dayjs | null) => {
    if (value) {
      setEveryoneTime((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      setState((prevState) => ({
        ...prevState,
        schedule: prevState.schedule.map((item) =>
          item.open ? { ...item, [name]: value } : item
        ),
      }));
    }
  };

  const onClickAddress = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      address: value,
    }));
  };

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    await dispatch(createInstitution(state));
  };

  return (
    <>
    <Box
      onSubmit={formSubmitHandler}
      component="form"
      className="institution-form"
    >
      <div className="form-block main-form">
        <TextField
          required
          label="Название заведение"
          name="name"
          type="text"
          value={state.name}
          onChange={inputChangeHandler}
        />

        <TextField
          label="Описание"
          name="description"
          multiline //input становится textarea
          rows={8} //Кол-во видимых строк
          variant="outlined"
          value={state.description}
          onChange={inputChangeHandler}
        />

        <div>
          <TextField
            fullWidth
            required
            label="Адрес заведение (Улица, номер здании)"
            name="address"
            type="text"
            value={state.address}
            onChange={inputChangeHandler}
          />
          {searchResult.map((elem, i) => (
            elem.displayName !== state.address &&
            <Search key={i} displayName={elem.displayName} onClick={() => onClickAddress(elem.displayName)} />
          ))}
        </div>
        Добавить рабочий номер телефона (необезательное поле)
      </div>

      <div className="form-block">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography component="div" sx={{ mb: 3 }}>Задать время рабочим дням:</Typography>
          <TimePicker
            label="Начало рабочего дня"
            value={everyoneTime.start}
            onChange={(value) => handleSetTimeEveryone('start', value)}
            ampm={false}
          />
          <TimePicker
            label="Конец рабочего дня"
            value={everyoneTime.finish}
            onChange={(value) => handleSetTimeEveryone('finish', value)}
            ampm={false}
          />
        </LocalizationProvider>

        <Typography component="div" sx={{ mt: 3 }}>Рабочие дни:</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {state.schedule.map((elem, index) => (
            <div key={elem.day} className="form-time">
              <FormControlLabel
                key={elem.day}
                control={
                  <Checkbox
                    checked={elem.open}
                    onChange={() => handleScheduleChange(index)}
                  />
                }
                label={elem.day + ':'}
              />
              {elem.open ?
                <div style={{ display: "inline-block" }}>
                  <TimePicker
                    className="time-styles"
                    label="Начало"
                    value={elem.start}
                    onChange={(value) => handleTimeChange(index, 'start', value)}
                    ampm={false}
                  />
                  <TimePicker
                    className="time-styles"
                    label="Конец"
                    value={elem.finish}
                    onChange={(value) => handleTimeChange(index, 'finish', value)}
                    ampm={false}
                  />
                </div>
                : 'Закрыто'}
            </div>
          ))}
        </LocalizationProvider>
      </div>

      <div className="institution-btn">
        <Button type="submit">Отправить</Button>
      </div>
    </Box>
    </>
  );
};

export default CreateInstitution;
