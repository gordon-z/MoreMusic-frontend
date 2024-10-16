import { useState, useEffect } from "react";
import api from "../api";
import RecommendationItem from "../components/RecommendationItem.jsx";
import "../styles/Default.css";
import RangeSlider from "../components/RangeSlider.jsx";

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
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Create a Recommendation</h2>
            <form onSubmit={createRecommendation} className="space-y-6">
                {/* Seed Type */}
                <div>
                    <label
                        htmlFor="seedType"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Seed Type:
                    </label>
                    <select
                        id="seedType"
                        name="seedType"
                        required
                        value={seedType}
                        onChange={(e) => setSeedType(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a seed type
                        </option>
                        <option value="track">Track</option>
                        <option value="artist">Artist</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>

                {/* Seed */}
                <div>
                    <label
                        htmlFor="seed"
                        className="block text-lg font-medium text-gray-700"
                    >
                        Seed:
                    </label>
                    <input
                        type="text"
                        id="seed"
                        name="seed"
                        required
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="SongName/ArtistName/Genre"
                    />
                </div>

                {/* Number of Results */}
                <RangeSlider numResults={numResults} setNumResults={setNumResults}/>

                {/* Submit Button */}
                <div>
                    <input
                        type="submit"
                        value="Submit"
                        className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
                    />
                </div>
            </form>

            <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 mt-10">Recommendations</h2>
                {recommendations.map((recommendation) => (
                    <div key={recommendation.id}>
                        <RecommendationItem
                            recommendation={recommendation}
                            onDelete={() =>
                                deleteRecommendation(recommendation.id)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
