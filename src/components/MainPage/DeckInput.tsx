import React, {
    ChangeEvent,
    useRef,
    useCallback,
    FormEvent,
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
    }, [deckListIdValue, deckInput, onSearch]);

    const handleInputOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        deckInput.current?.setCustomValidity('');
        setDeckListIdValue(event.currentTarget.value);
    }, [deckInput, setDeckListIdValue]);

    const onSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        handleSearch();
    }, [handleSearch]);

    return (
        <form
            className="margin-top-3"
            onSubmit={onSubmit}
        >
            <div className="column">
                {/* Search for a decklist here */}
                <div className="row">
                    <input
                        data-testid="deck-input"
                        value={deckListIdValue}
                        onChange={handleInputOnChange}
                        // onKeyDown={handleInputKeyDown}
                        required
                        ref={deckInput}
                        placeholder="Search for a decklist here"
                    />
                    <button
                        data-testid="search-button"
                        type="submit"
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DeckInput;
