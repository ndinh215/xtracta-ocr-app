import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import * as React from 'react';

type Props = {
    children?: React.ReactNode;
};

declare module '@mui/material/styles' {
    // index signature typegradients
    interface TypeGradient {
        [key: string]: string;
    }

    interface Palette {
        gradient: TypeGradient;
    }

    interface PaletteOptions {
        gradient: TypeGradient;
    }

    interface TypeBackground {
        opposite: string;
    }
}

//children with ReactNode type
export default function AppThemeProvider({children}: Props) {
    const theme = responsiveFontSizes(
        createTheme({
            palette: {
                primary: {
                    main: '#FF963C',
                },
                secondary: {
                    main: '#d3e0d7',
                },
                warning: {
                    main: '#FFCC21',
                },
                background: {
                    default: '#FCFBFA',
                    opposite: '#1F1F1F',
                    paper: '#FCFCFC',
                },
                text: {
                    primary: '#2E2E2E',
                },
                common: {
                    black: '#2E2E2E',
                    white: '#ffffff',
                },
                gradient: {
                    bronze: 'linear-gradient(180deg, #9C6D3E 0%, #E8C8A9 100%)',
                    silver: 'linear-gradient(180deg, #808080 0%, #DFDFDF 100%)',
                    gold: 'linear-gradient(180deg, #A3873C 0%, #E3D294 100%)',
                },
            },
            typography: {
                fontFamily: 'Inter, Roboto, sans-serif, -apple-system, BlinkMacSystemFont',
                body1: {
                    lineHeight: '20px',
                },
                body2: {
                    lineHeight: '18px',
                },
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            scrollBehavior: 'smooth',
                        },
                    },
                },
                MuiLink: {
                    styleOverrides: {
                        root: {
                            cursor: 'pointer',
                            textDecoration: 'none',
                            lineHeight: '16px',
                            transition: 'all 0.1s ease-in-out',
                            '&:hover': {
                                opacity: 0.8,
                            },
                        },
                    },
                },
                MuiIconButton: {
                    styleOverrides: {
                        root: {
                            aspectRatio: '1/1',
                        },
                    },
                },
            },
        }),
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
