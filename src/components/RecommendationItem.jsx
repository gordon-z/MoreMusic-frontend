import { useState } from "react";

function RecommendationItem({ recommendation, onDelete }) {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const cache = localStorage.getItem(`collapsed-${recommendation.id}`);
        return cache === "true" ? true : false;
    });

    const toggleCollapse = () => {
        setIsCollapsed((prev) => {
            const newState = !prev;
            localStorage.setItem(`collapsed-${recommendation.id}`, newState);
            return newState;
        });
    };

    if (!recommendation.tracks || recommendation.tracks.length === 0) {
        return null;
    }

    return (
        <div className="recommendation-item bg-white border rounded-lg p-6 mb-6 shadow-lg">
            {/* Recommendation Header */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Recommendation ID: {recommendation.id}
                </h3>
                <button onClick={toggleCollapse} className="text-gray-600 flex">
                    {isCollapsed ? "▲" : "▼"}
                </button>
            </div>

            <p className="text-sm text-gray-600">
                Seed Type: {recommendation.seed_type}
            </p>
            <p className="text-sm text-gray-600 mb-4">
                Seed: {recommendation.seed}
            </p>

            {/* Tracks Section */}
            {!isCollapsed && (
                <div>
                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                        Tracks:
                    </h4>
                    <ul className="space-y-4">
                        {recommendation.tracks.map((track) => (
                            <li
                                key={track.id}
                                className="py-4 flex space-x-4 items-start bg-gray-50 rounded-lg shadow-md p-4"
                            >
                                <img
                                    src={track.album_art}
                                    alt={track.track_name}
                                    className="w-16 h-16 rounded-md shadow"
                                />
                                <div>
                                    <strong className="text-lg font-bold text-gray-900">
                                        {track.track_name}
                                    </strong>
                                    <span className="text-sm text-gray-600">
                                        {" "}
                                        by {track.artist_name}
                                    </span>
                                    <p className="text-sm text-gray-500">
                                        Album: {track.album_name} (
                                        {track.album_release_date})
                                    </p>
                                    <a
                                        href={track.track_uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        Listen on Spotify
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h5 className="text-sm text-gray-500 mt-4">
                        Created At:{" "}
                        {new Date(recommendation.timestamp).toLocaleString()}
                    </h5>

                    <button
                        className="delete-button mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                        onClick={() => onDelete(recommendation.id)}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default RecommendationItem;
