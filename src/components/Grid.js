import React, { useState } from 'react';
import '../styles/Grid.css';

const Grid = ({ grid, setNode }) => {
    const [isMousePressed, setIsMousePressed] = useState(false);

    const handleMouseDown = () => {
        setIsMousePressed(true);
    };

    const handleMouseUp = () => {
        setIsMousePressed(false);
    };

    const handleMouseEnter = (row, col) => {
        if(isMousePressed) {
            setNode(row, col);
        }
    };

    const handleClick = (row, col) => {
        setNode(row, col);
    };

    return (
        <div 
            className="grid-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((cell, colIndex) => (
                        <div 
                            key={colIndex} 
                            className={`grid-cell ${cell === 5 ? 'start-node' : ''} ${cell === 3 ? 'end-node' : ''} ${cell === 1 ? 'wall-node' : ''} ${cell === 2 ? 'visited-node' : ''}`}
                            onMouseDown={() => handleClick(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;