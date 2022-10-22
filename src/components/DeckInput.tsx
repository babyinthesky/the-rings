import { useState } from 'react';

const DeckInput = ({
    deckListIdValue,
    setDeckListIdValue,
    onSearch,
} : {
    deckListIdValue: string;
    setDeckListIdValue: (id: string) => void;
    onSearch: () => void;
}) => {
    // const [deckInput, setDeckInput] = useState('');

    return (
        <form>
            <div className="column">
                <span>
                    Search for a decklist here
                </span>
                <div className="row">
                    <input
                        value={deckListIdValue}
                        onChange={(e) => {
                            setDeckListIdValue(e.currentTarget.value);
                        }}
                    />
                    <button
                        type="button"
                        onClick={()=>{
                            // console.log(deckInput)
                            onSearch();
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
}

export default DeckInput;