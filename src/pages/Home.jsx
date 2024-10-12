import { useState, useEffect } from "react";
import api from "../api";

function Home() {
    const [recommendations, setRecommendations] = useState([]);
    const [seedType, setSeedType] = useState("");
    const [seed, setSeed] = useState("");
    const [numResults, setNumResults] = useState(1);

    useEffect(() => {
        getRecommendations();
    }, []);

    const getRecommendations = () => {
        api.get("/api/recommendation")
            .then((res) => res.data)
            .then((data) => {
                setRecommendations(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteRecommendation = (id) => {
        api.delete(`/api/recommendation/delete/${id}`)
            .then((res) => {
                if (res.status === 204) alert("Recommendation deleted! ");
                else alert("Failed to delete recommendation. ");
                getRecommendations();
            })
            .catch((error) => alert(error));
    };

    const createRecommendation = (e) => {
        e.preventDefault();
        api.post("/api/recommendation", {
            seed_type: seedType,
            seed,
            num_results: numResults,
        })
            .then((res) => {
                if (res.status === 201) alert("Recommendation created! ");
                else alert("Failed to create recommendation. ");
                getRecommendations();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Recommendations</h2>
            </div>
            <h2>Create a recommendation</h2>
            <form onSubmit={createRecommendation}>
                <label>Seed Type:</label>
                <br />
                <select
                    id="seedType"
                    name="seedType"
                    required
                    value={seedType}
                    onChange={(e) => setSeedType(e.target.value)}
                >
                    <option value="" disabled>Select a seed type</option>
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="genre">Genre</option>
                </select>
                <label>Seed:</label>
                <br />
                <input
                    type="text"
                    id="seed"
                    name="seed"
                    required
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                />
                <label>Number of results:</label>
                <br />
                <input
                    type="range"
                    id="numResults"
                    name="numResults"
                    min={1}
                    max={10}
                    step={1}
                    required
                    value={numResults}
                    onChange={(e) => setNumResults(parseInt(e.target.value))}
                />
                <h4>Number of Results: {numResults}</h4>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;
