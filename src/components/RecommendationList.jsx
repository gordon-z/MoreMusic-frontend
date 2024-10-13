import React from "react"

function RecommendationItem({recommendation, onDelete}) {
    return (
        <div className="recommendation-item border rounded p-4 mb-4 shadow">
            <h3>Recommendation ID: {recommendation.id}</h3>
            <p>Seed Type: {recommendation.seed_type}</p>
            <p>Seed: {recommendation.seed}</p>
            <h4>Tracks:</h4>
            <ul>
                {recommendation.tracks.map((track) => (
                    <li key={track.id}>
                        <strong>{track.track_name}</strong> by {track.artist_name}
                        <br />
                        Album: {track.album_name} ({track.album_release_date})
                        <br />
                        <a href={track.track_uri}>Listen on Spotify</a>
                    </li>
                ))}
            </ul>
            <button className="delete-button" onClick={() => onDelete(recommendation.id)}>Delete</button>
        </div>
    );
}

function RecommendationList({ recommendations }) {
    if (recommendations.length === 0) {
        return <p>No recommendations found.</p>;
    }

    return (
        <div className="recommendation-list">
            {recommendations.map((recommendation) => (
            <div>
                <RecommendationItem
                    key={recommendation.id}
                    recommendation={recommendation}
                />
                <h5>Created At: {recommendation.timestamp}</h5>
            </div>
            ))}
        </div>
    );
}

export default RecommendationList;