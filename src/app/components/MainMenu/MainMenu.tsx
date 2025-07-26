import React, { useState } from 'react';
import { MENU_ITEMS, PROFILE_MENU_ITEMS } from '@shared/config/constants';
import type { User } from '@entities/user';
import './MainMenu.css';

interface MainMenuProps {
  user: User | null;
  onMenuItemClick?: (itemId: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  user,
  onMenuItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setHoveredItem(null);
  };

  const handleItemClick = (itemId: string) => {
    onMenuItemClick?.(itemId);
  };

  const handleItemHover = (itemId: string) => {
    setHoveredItem(itemId);
  };

  return (
    <div 
      className={`main-menu ${isOpen ? 'main-menu--open' : ''}`}
    >
      {/* Collapsed Menu Icons */}
      <div 
        className="main-menu__icons"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`main-menu__icon ${hoveredItem === item.id ? 'main-menu__icon--hovered' : ''}`}
            onClick={() => handleItemClick(item.id)}
            onMouseEnter={() => handleItemHover(item.id)}
            title={item.label}
          >
            <span className="main-menu__icon-symbol">{item.icon}</span>
          </button>
        ))}
      </div>

      {/* Expanded Menu Panel */}
      <div 
        className={`main-menu__panel ${isOpen ? 'main-menu__panel--visible' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="main-menu__panel-content">
          {/* Profile Section */}
          <div className="main-menu__profile">
            <div className="main-menu__avatar">
              <img 
                src={user?.avatar || '/default-avatar.png'} 
                alt={user?.name || 'User'} 
                className="main-menu__avatar-image"
              />
            </div>
            <div className="main-menu__user-info">
              <h3 className="main-menu__username">{user?.name || 'Guest User'}</h3>
              <span className="main-menu__user-status">Premium Member</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="main-menu__nav">
            <ul className="main-menu__list">
              {MENU_ITEMS.map((item) => (
                <li key={item.id} className="main-menu__item">
                  <button
                    className={`main-menu__link ${hoveredItem === item.id ? 'main-menu__link--hovered' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                    onMouseEnter={() => handleItemHover(item.id)}
                  >
                    <span className="main-menu__link-icon">{item.icon}</span>
                    <span className="main-menu__link-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Profile Menu */}
          <div className="main-menu__profile-menu">
            <ul className="main-menu__profile-list">
              {PROFILE_MENU_ITEMS.map((item) => (
                <li key={item.id} className="main-menu__profile-item">
                  <button
                    className="main-menu__profile-link"
                    onClick={() => handleItemClick(item.id)}
                  >
                    <span className="main-menu__profile-icon">{item.icon}</span>
                    <span className="main-menu__profile-text">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* <div className={`main-menu__overlay ${isOpen ? 'main-menu__overlay--visible' : ''}`} /> */}
    </div>
  );
};
