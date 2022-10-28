import { ChangeEvent } from 'react';

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
    const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDeckListIdValue(event.currentTarget.value);
    }
    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }

    return (
        <form className="margin-top-3">
            <div className="column">
                {/* <span>
                    Search for a decklist here
                </span> */}
                <div className="row">
                    <input
                        value={deckListIdValue}
                        onChange={handleInputOnChange}
                        onKeyDown={handleInputKeyDown}
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