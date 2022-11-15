import React, {
    KeyboardEvent,
    ChangeEvent,
    useRef,
    useCallback,
} from 'react';

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

    const handleSearch = useCallback(() => {
        if (deckListIdValue && !Number.isNaN(parseInt(deckListIdValue, 10))) {
            onSearch();
        } else {
            deckInput.current?.setCustomValidity('Please enter one valid id value in number');
            deckInput.current?.reportValidity();
        }
    }, [deckListIdValue, onSearch, deckInput]);

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        deckInput.current?.setCustomValidity('');
        setDeckListIdValue(event.currentTarget.value);
    }, [deckInput, setDeckListIdValue]);

    const handleInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    }, [handleSearch]);

    return (
        <form className="margin-top-3">
            <div className="column">
                {/* Search for a decklist here */}
                <div className="row">
                    <input
                        data-testid="deck-input"
                        value={deckListIdValue}
                        onChange={handleInputOnChange}
                        onKeyDown={handleInputKeyDown}
                        required
                        ref={deckInput}
                        placeholder="Search for a decklist here"
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
    );
};

export default DeckInput;
