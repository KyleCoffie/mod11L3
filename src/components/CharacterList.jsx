// CharacterList.js (Updated)
import { useEffect, useState } from 'react';
import axios from 'axios';
import { publicKey, hash } from './passwords.jsx';
import './CharacterLists.css';

const CharacterList = ({ onCharacterClick }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`);
                setCharacters(response.data.data.results);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="character-list">
            {characters.map(character => (
                <div key={character.id} className="character-card" onClick={() => onCharacterClick(character.id)}>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
                    <h3>{character.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
