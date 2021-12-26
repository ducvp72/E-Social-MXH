import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <div className="p-2">
      <LinearProgress
        variant="determinate"
        {...props}
        sx={{
          borderRadius: "50px",
        }}
      />

      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </div>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
const LoadingMedia = (props) => {
  const { process } = props;
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(process);
    // console.log("Proceess", process);
    return () => {
      setProgress(0);
    };
  }, [process]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
    </>
  );
};

export default LoadingMedia;
