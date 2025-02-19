// App.js
import { useState } from 'react';
import CharacterList from './components/CharacterList.jsx';
import CharacterDetail from './components/CharacterDetails.jsx';

const App = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const handleCharacterClick = (characterId) => {
        setSelectedCharacterId(characterId);
    };

    return (
        <div>
            <h1>Marvel Comics Characters</h1>
            <CharacterList onCharacterClick={handleCharacterClick} />
            {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
        </div>
    );
};

export default App;
