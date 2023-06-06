export function ImageDetailsPage({ artwork, onBack }) {
	return (
		<div>
			<h2>Artwork Details</h2>
			{artwork ? (
				<div>
					<h3>{artwork.title}</h3>
					<p>Artist: {artwork.artist_title}</p>
					<img
						alt={artwork.title}
						src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
					/>
					<button onClick={onBack}>Back</button>
				</div>
			) : (
				<p>Loading artwork details...</p>
			)}
		</div>
	);
}
