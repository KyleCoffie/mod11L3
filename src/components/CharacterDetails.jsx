import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { publicKey, hash } from './passwords.jsx';


const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        console.log('Fetching Charecter details for id',id);
        //fetch the character detail
        const fetchCharacterDetails = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${publicKey}&hash=${hash}`);
                console.log('Character details fetched:', response.data);
                setCharacter(response.data.data.results[0]);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching character details:', err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCharacterDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!character) return null;

    console.log('Rendering CharacterDetails Component');
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

export default CharacterDetails;
