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
    const handleSearch = () => onSearch();
    return (
        <form className="marginTop">
            <div className="column">
                {/* <span>
                    Search for a decklist here
                </span> */}
                <div className="row">
                    <input
                        value={deckListIdValue}
                        onChange={(e) => {
                            setDeckListIdValue(e.currentTarget.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
}

export default DeckInput;