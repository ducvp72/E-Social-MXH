module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
        },
        // black: {
        //   light: "#262626",
        //   faded: "#00000059",
        // },
      },
      height: {
        cus: "45rem",
      },
      width: {
        cus: "38rem",
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
      borderColor: ["checked"],
      borderWidth: ["hover", "focus", "checked"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
