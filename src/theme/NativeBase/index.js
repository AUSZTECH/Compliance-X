import { extendTheme } from "native-base"
import COLORS from "../COLORS"

const theme = extendTheme({
    colors: {
        primary: {
            50: '#f2e7fd',
            100: '#e6cefa',
            200: '#d9b6f8',
            300: '#c085f3',
            400: '#a754ee',
            500: '#8e23e9',
            600: '#810be7',
            700: '#740ad0',
            800: '#6709b9',
            900: '#6709b9'
        },
        secondary: {
            50: '#e8e8e8',
            100: '#d1d1d1',
            200: '#bababa',
            300: '#a3a3a3',
            400: '#767676',
            500: '#484848',
            600: '#313131',
            700: '#1a1a1a',
            800: '#171717',
            900: '#151515'
        },

    },

    components: {
        Box: {
            variants: {
                container: {
                    flex: 1,
                    backgroundColor: COLORS.backgroundColor,
                },

                card: {
                    p: 3,
                    borderRadius: 15,
                    backgroundColor: '#FFF',
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.17,
                    shadowRadius: 3.05,
                    elevation: 4
                },
            }
        },

        Button: {
            baseStyle: {
                // height: 12,
                minWidth: 125,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
            }
        },

        IconButton: {
            baseStyle: {
                borderRadius: 10
            }
        },

        Input: {
            baseStyle: {
                // height: 10,
                borderRadius: 10
            },
            defaultProps: {
                fontSize: 16
            }
        },

        FormControlLabel: {
            baseStyle: {
                _text: {
                    fontSize: 14
                }
            }
        },

        Heading: {
            baseStyle: {
                color: 'primary.600'
            }
        },

        ScrollView: {
            defaultProps: {
                indicatorStyle: {
                    padding: 10,
                    backgroundColor: '#fff'
                }
            }
        },

        Stack: {
            variants: {
                container: {
                    padding: 4,
                    defaultProps: {
                        space: 4
                    }
                }
            }
        },

        Toast: {
            baseStyle: {
                bg: 'primary.600',
                rounded: 'lg',
                opacity: 0.9,
            },
        },
    }
})

export default theme