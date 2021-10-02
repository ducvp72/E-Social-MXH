import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./signup.css";
import { Searchcb } from "./Searchcb";

const Singup = () => {
  const [value, setValue] = React.useState(new Date());
  console.log(value);

  return (
    <div className="container">
      <div className="flex flex-col items-center">
        <h1 class="mb-2 text-2xl font-display font-bold text-primarycolor">
          Create Your Account
        </h1>
        <form className="w-2/3">
          <div className="customDate">
            <TextField
              id="outlined-basic"
              label="Fullname"
              variant="outlined"
            />
          </div>
          <div class="customDate">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                variant="filled"
                openTo="year"
                label="Date of birth"
                views={["year", "month", "day"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-2">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div class="customCb">
            <Searchcb />
          </div>
          <div class="customDate">
            <TextField
              placeholder="Example@gmail.com"
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div class="customDate">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
          </div>
          <div class="customDate">
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
          <button
            class="block w-full py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
            style={{ boxShadow: "0 0 10px 0 gray" }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
