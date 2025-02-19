// CharacterDetail.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { publicKey, hash } from './passwords.jsx';

const CharacterDetail = ({ characterId }) => {
    //store the character data
    const [character, setCharacter] = useState(null);
    //store the loading state
    const [loading, setLoading] = useState(true);
    //store the error state
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch the character detail
        const fetchCharacterDetail = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`);
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCharacterDetail();
    }, [characterId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!character) return null;

    return (
        <div>
            <h2>{character.name}</h2>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.description}</p>
            <h3>Comics</h3>
            <ul>
                {character.comics.items.map((comic, index) => (
                    <li key={index}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;
