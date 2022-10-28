import { ChangeEvent, useRef } from 'react';

const DeckInput = ({
    deckListIdValue,
    setDeckListIdValue,
    onSearch,
} : {
    deckListIdValue: string;
    setDeckListIdValue: (id: string) => void;
    onSearch: () => void;
}) => {
    const deckInput = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (deckListIdValue && !isNaN(parseInt(deckListIdValue))) {
            onSearch();
        } else {
            deckInput.current?.setCustomValidity('Please enter one valid id value in number');
            deckInput.current?.reportValidity();
        }
    }
    const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        deckInput.current?.setCustomValidity('');
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
                        required
                        ref={deckInput}
                    />
                    <button
                        data-testid="search-button"
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