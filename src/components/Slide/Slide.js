import React from "react"
import useTilt from "./useTilt"

function Slide({ slide, offset }) {
	const active = offset === 0 ? true : null
	const ref = useTilt(active)



	return (
		<div
			ref={ref}
			className="slide"
			data-active={active}
			style={{
				"--offset": offset,
				"--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
			}}
		>
			<div
				className="slideBackground"
				style={{
					backgroundImage: `url('${slide.book_image}')`,
				}}
			/>
				<div
					className="slideContent"
					style={{
						backgroundImage: active ? "unset" : `url('${slide.book_image}')`,
					}}
				>
					<div className="slideContentInner">
						<h2 className="mobile">New York Times Best Seller List</h2>
						{active ? (
							<>
								<img src={slide.book_image} alt={(slide.title, slide.subtitle)} />
							</>
						) : null}
						{/* <h2 className="slideTitle">{slide.title}</h2>
						<h3 className="slideSubtitle">{slide.subtitle}</h3> */}
						
						<p className="slideDescription">{slide.description}</p>
					</div>
				</div>
		</div>
	)
}

export default Slide