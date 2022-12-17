import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const names = ["White", "Black", "Red", "Yellow", "Blue", "Green"];

export default function MultipleSelectChip({ colors, setColors }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setColors(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 200 }}>
        <Select
          multiple
          value={colors}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  style={{
                    backgroundColor: value,
                    border: "1px solid lightgrey",
                    color:
                      value === "White" || value === "Yellow"
                        ? "black"
                        : "white",
                  }}
                />
              ))}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
