import React, { useState, useEffect, useReducer } from "react"
import { getAllBooks } from "./services/getAllBooks"
import Slide from "./components/Slide/Slide"
import "./App.scss"
import apiKey from "./env"

function App() {
	const [bookData, setBookData] = useState([])
	const [loading, setLoading] = useState(true)
	const initialUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`

	//lifecycle for fetching NYT API list
	useEffect(() => {
		async function fetchData() {
			let response = await getAllBooks(initialUrl)
			setBookData(response.results.books.reverse())
			setLoading(false)
		}
		fetchData()
	}, [initialUrl])

	//lifecycle of keystrokes
	useEffect(() => {
		window.addEventListener(
			"keydown",
			(ev) => {
				if(ev.key === "ArrowRight") {
					handleNext()
				} else if (ev.key === "ArrowLeft") {
					handlePrev()		
				}
			})
	}, [])

	
	//renaming of API data for integration into carousel
	let slides = bookData

	//first slides index: actually ends up being opposite since data needed to be reversed
	const initialState = {
		slideIndex: slides.length - 1,
	}

	//reducer for the slides and slide movement logic
	const slidesReducer = (state, event) => {
		if (event.type === "PREV") {
			return {
				...state,
				slideIndex:
					state.slideIndex === -1 ? -1 : (state.slideIndex + 1) % slides.length,
			}
		}
		if (event.type === "NEXT") {
			return {
				...state,
				slideIndex:
					state.slideIndex === 0 - slides.length ? -1 : state.slideIndex - 1,
			}
		}
	}

	// state for moving the slides forward or back
	const [state, dispatch] = useReducer(slidesReducer, initialState)

	//function for state change of slide movement named in order to be reused
	const handleNext = () => dispatch({ type: "NEXT" })
	const handlePrev = () => dispatch({ type: "PREV" })

	//not a real slide, exists on the background simulating a first slide on desktop view
	const headerSlide = (
		<div className="headerSlide">
			<h1>New York Times</h1>
			<h3>Best Sellers List</h3>
		</div>
	)

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div className="slides">
						{state.slideIndex === -1 ? headerSlide : (
							<button onClick={handlePrev}>‹</button>
						)}

						{[...slides].map((slide, i) => {
							let offset = slides.length + (state.slideIndex - i)
							return <Slide slide={slide} offset={offset} key={i} />
						})}

						<button onClick={handleNext}>
							{state.slideIndex === 0 - slides.length ? "↫" : "›"}
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default App
