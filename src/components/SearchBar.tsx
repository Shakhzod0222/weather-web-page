import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import type { GeocodingApiResponse, GeocodingResult } from '../types/geocoding';
import { CloseIcon, SearchIcon } from './icons/WeatherIcons';

interface SearchBarProps {
  onSelectCity: (city: GeocodingResult) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  placeholder = 'Shahar yoki joylashuvni qidiring...',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const debouncedQuery = useDebounce(query, 400);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tashqariga bosilganda natijalarni yopish
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced qidiruv
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      setSelectedIndex(-1);
      return;
    }

    let isSubscribed = true;
    setIsLoading(true);

    const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      trimmed
    )}&count=8&format=json`;

    fetch(searchUrl)
      .then((res) => res.json())
      .then((data: GeocodingApiResponse) => {
        if (!isSubscribed) return;
        setResults(data.results || []);
        setIsLoading(false);
        setIsOpen(true);
        setSelectedIndex(-1);
      })
      .catch((err) => {
        if (!isSubscribed) return;
        console.error('Shahar qidirishda xatolik:', err);
        setResults([]);
        setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [debouncedQuery]);

  const handleSelect = (item: GeocodingResult) => {
    onSelectCity(item);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-white/60 pointer-events-none">
          <SearchIcon size={16} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen && e.target.value.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Shahar qidiruvi"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/20 hover:bg-black/25 focus:bg-black/30 border border-white/20 focus:border-white/40 text-white placeholder-white/50 text-sm outline-none transition-all duration-200 shadow-inner backdrop-blur-md"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            aria-label="Qidiruvni tozalash"
            className="absolute right-3 p-1 text-white/60 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <CloseIcon size={14} />
          </button>
        )}

        {isLoading && (
          <div className="absolute right-3 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin pointer-events-none" />
        )}
      </div>

      {/* Autocomplete natijalar ro'yxati */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-2 py-1.5 rounded-xl bg-[#1e293b]/90 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
        >
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`px-4 py-2.5 cursor-pointer text-left transition-colors flex flex-col ${
                    isSelected ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-white/60">
                    {[item.admin1, item.country].filter(Boolean).join(', ')}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-xs text-white/60 text-center">
              {isLoading ? 'Qidirilmoqda...' : 'Hech qanday shahar topilmadi'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
