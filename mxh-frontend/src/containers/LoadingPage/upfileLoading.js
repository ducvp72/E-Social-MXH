import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <>
      <div
        className="post-show fixed w-full h-full opacity-50 z-40 top-0 left-0 bottom-0 flex justify-center items-center"
        style={{ background: "#fff" }}
      >
        <div className=" flex justify-center items-center justify-items-center rounded-full bg-none "></div>
      </div>

      <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress variant="determinate" {...props} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
}

// CircularProgressWithLabel.propTypes = {
//   value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
// };

export default function CircularStatic(props) {
  const { process } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(process);
    // console.log("Proceess", process);
    return () => {
      setProgress(0);
    };
  }, [process]);

  return <CircularProgressWithLabel value={progress} />;
}
