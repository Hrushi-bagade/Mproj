import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = ({ suggestions, onSelectCompany }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchTerm(query);
        if (query) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.CmpName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.CmpName);
        setFilteredSuggestions([]);
        onSelectCompany(suggestion);
    };

    return (
        <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '24px',
                padding: '0 10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
                <FontAwesomeIcon icon={faSearch} style={{ color: '#888', marginRight: '10px' }} />
                <input
                    type="text"
                    placeholder="Search for a company..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    style={{
                        border: 'none',
                        outline: 'none',
                        flex: 1,
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '24px',
                        boxShadow: 'none',
                        width: '100%', // Ensures input field uses full width of container
                    }}
                />
            </div>
            {filteredSuggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    margin: '0',
                    padding: '0',
                    listStyle: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                }}>
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.CmpId}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        >
                            {suggestion.CmpName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
