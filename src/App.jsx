import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CharacterList from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import NotFound from './components/NotFound';
import NavigationBar from './components/NavigationBar';

function App() {
    console.log('Rendering App.jsx')
    return (
        <div>
            <NavigationBar />       
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse-characters" element={<CharacterList />} />
                <Route path="/character-details/:id" element={<CharacterDetails />} />
                <Route path="/comics" element={<Comics />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
