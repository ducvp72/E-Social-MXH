module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        sm1: "10px",
      },
      fontFamily: {
        avatar: ["Finger Paint", "cursive"],
      },
      colors: {
        primarycolor: "#0099ff",
        blue: {
          medium: "#005c98",
        },
        gray: {
          base: "#616161",
          background: "#fafafa",
          primary: "#dbdbdb",
        },
        red: {
          primary: "#ed4956",
          light: "#262626",
          faded: "#00000059",
        },
        mygrey: "#65676b",
      },
      height: {
        cus: "38rem",
      },
      width: {
        cus: "38rem",
        response: "620px",
      },
    },
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    fontFamily: {
      display: ["Nunito", "san-serif"],
    },
    // colors: {
    //   white: '#ffffff',
    //   blue: {
    //     medium: '#005c98'
    //   },

    //   gray: {
    //     base: '#616161',
    //     background: '#fafafa',
    //     primary: '#dbdbdb'
    //   },
    // }
  },

  variants: {
    extend: {
      backgroundColor: ["checked"],
      textColor: ["focus"],
      borderColor: ["checked"],
      borderWidth: ["hover", "focus", "checked"],
      display: ["group-hover", "hover"],
      transitionDuration: ["group-hover", "hover", "focus"],
      transitionDelay: ["group-hover", "hover", "focus"],
      transitionTimingFunction: ["group-hover", "hover", "focus"],
      transitionProperty: ["group-hover", "hover", "focus"],
      ring: ["focus"],
    },
  },
  plugins: [],
};
