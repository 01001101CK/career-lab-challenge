import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

import { ImageDetailsPage } from './ImageDetailsPage';

import './App.css';

export function App() {
	const [artDetails, setArtDetails] = useState({});
	const [selectedArtwork, setSelectedArtwork] = useState(null);
	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((json) => {
			console.log(json);
			setArtDetails(json.data);
		});
	}

	function handleGoBack() {
		setSelectedArtwork(null);
	}

	const renderArtDetails = () => {
		if (Object.keys(artDetails).length === 0) {
			return null; // No art details available
		}

		return (
			<div>
				<h4>Please click on the title for details</h4>
				<ul>
					{artDetails
						.sort((a, b) => b._score - a._score) // Sort the art details based on score in descending order
						.map((artwork) => (
							<li key={artwork.image_id}>
								<button
									className="artwork-title"
									onClick={() => setSelectedArtwork(artwork)}
								>
									{artwork.title}
								</button>
								<p>Artist: {artwork.artist_title}</p>
							</li>
						))}
				</ul>
			</div>
		);
	};

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			{selectedArtwork ? (
				<ImageDetailsPage artwork={selectedArtwork} onBack={handleGoBack} />
			) : (
				renderArtDetails()
			)}
			<Footer />
		</div>
	);
}
