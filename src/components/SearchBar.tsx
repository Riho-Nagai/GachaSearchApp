import React from "react";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
};

function SearchBar({ searchQuery, setSearchQuery, onSearch }: SearchBarProps) {
  // 入力内容が変更されたときの処理
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Enterキーを押したときの処理
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="ここで検索"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button type="button" onClick={onSearch}>
        検索
      </button>
    </div>
  );
}

export default SearchBar;
