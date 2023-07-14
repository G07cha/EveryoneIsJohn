export interface Theme {
  palette: Record<'primary' | 'secondary' | 'muted' | 'font' | 'error', string>;
}

export const defaultTheme: Theme = {
  palette: {
    primary: '#3F97FF',
    secondary: '#FFF',
    error: '#FE3535',
    font: '#333',
    muted: '#BDBDBD',
  },
};

// TODO: Design color palette for dark theme
export const darkTheme = defaultTheme;
