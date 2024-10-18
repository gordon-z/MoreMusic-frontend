import React, { useState } from "react";

function RangeSlider({ numResults, setNumResults }) {
    return (
        <div className="my-4">
            <label htmlFor="numResults" className="text-sm font-medium">
                Number of Results:
            </label>
            <input
                type="range"
                id="numResults"
                name="numResults"
                min={1}
                max={10}
                step={1}
                value={numResults}
                onChange={(e) => setNumResults(parseInt(e.target.value))}
                style={{
                    background: `linear-gradient(to right, #1ED760  ${
                        ((numResults - 1) * 100) / 9
                    }%, #e0e0e0 ${((numResults - 1) * 100) / 9}%)`,
                }}
                className="w-full appearance-none h-2 rounded-full"
            />
            <h4>Number of Results: {numResults}</h4>
        </div>
    );
}

export default RangeSlider;
