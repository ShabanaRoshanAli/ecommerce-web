import AppNavigation from './config/AppNavigation';
import { ThemeProvider } from 'react-bootstrap';
import { DataProvider } from './config/DataContext';


function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </ThemeProvider>

  );
}

export default App;
