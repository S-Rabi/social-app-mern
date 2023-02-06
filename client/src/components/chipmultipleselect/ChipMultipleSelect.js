import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const LIKES = [
  "Art",
  "Photography",
  "Cooking",
  "Traveling",
  "Reading",
  "Writing",
  "Music",
  "Dancing",
  "Sports",
  "Gaming",
  "Crafts",
  "Gardening",
  "Hiking",
  "Camping",
  "Fishing",
  "Skiing",
  "Snowboarding",
  "Volunteering",
  "Meditation",
  "Yoga",
  "Fitness",
  "Nature",
  "Technology",
  "Cars",
  "Movies",
  "TV Shows",
  "Theater",
  "History",
  "Geography",
  "Science",
  "Mathematics",
  "Philosophy",
  "Psychology",
  "Religion",
  "Languages",
  "Culture",
  "Food",
  "Wine",
  "Beer",
  "Coffee",
  "Tea",
  "Pets",
  "Nature",
];
function getStyles(name, likes, theme) {
  return {
    fontWeight:
      likes.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function MultipleSelectChip({ setLikes, likes }) {
  const theme = useTheme();
  // const [likes, setlikes] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLikes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  console.log("likes", likes);
  return (
    <div>
      <FormControl disabled={Boolean(!setLikes)} sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">LIKES</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={likes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {LIKES.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, likes, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
