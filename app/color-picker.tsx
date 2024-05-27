'use client'
import { useEffect, useState } from "react"

export default function ColorPicker() {
	const [color, setColor] = useState('#6374ae')
	const colors = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
	const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
	const [selectedColor, setSelectedColor] = useState('slate')
	const [selectedShade, setSelectedShade] = useState('500')
	const [bg, setBg] = useState('bg-gray-500')

	useEffect(() => {
		if (selectedColor !== bg.split('-')[1]) setBg(`bg-${selectedColor}-${selectedShade}`)
		if (selectedShade !== bg.split('-')[2]) setBg(`bg-${selectedColor}-${selectedShade}`)
	}, [bg, selectedColor, selectedShade])
	
	function ColorRadio({ color, shade }: { color: string, shade: string }) {
		return (
			<div
				className={`
					w-8 h-8
					rounded-full
					bg-${color}-${shade}
					ring-2 ring-offset-2
					ring-transparent
					has-[:checked]:ring-${color}-${shade}
					cursor-pointer
				`}
				onClick={() => {
					setSelectedColor(color)
					setSelectedShade(shade)
				}}
			>
				<input
					type="radio"
					id={`${color}-${shade}-radio`}
					name={`${color}-${shade}-radio`}
					checked={Boolean(color === selectedColor && shade === selectedShade)}
					aria-label={`${color}-${shade}-radio`}
					className="hidden"
				/>
			</div>
		)
	}

	return (
		<div className={`flex flex-col gap-3 p-1 items-center justify-between`}>
			<div
				className="px-4 py-3 rounded-full shadow-md border border-gray-200 flex items-center"
			>
				<input
					type="color"
					value={color}
					className="w-7 h-7 rounded-full overflow-hidden border-none cursor-pointer"
					title="Choose your color"
					onChange={(event) => setColor(event.target.value)}
				/>
				<input
					type="text"
					value={color}
					placeholder="Hexcode"
					className="px-2 py-1 ml-2 font-medium rounded-full bg-transparent"
					onChange={(event) => setColor(event.target.value)}
				/>
				<button disabled className="cursor-pointer text-sm hidden md:flex items-center gap-1 font-medium">
					HEX
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
					</svg>
				</button>
			</div>

			<div className={`w-40 h-40 rounded-lg ${bg}`}></div>

			<div className="p-1 my-2">
				{colors.map((color) => (
					<details
						key={color}
						className="
							w-full h-fit overflow-hidden
							flex flex-col gap-4
							items-center justify-between
							group accordion-section
							hover:bg-gray-50/50
							border border-gray-500 border-b-0
							first:rounded-t-lg
							last:border-b last:rounded-b-lg
							transition ease duration-500
						"
						role="group"
						open={Boolean(color === selectedColor)}
					>
						<summary
							className="
								w-full p-4 flex items-center justify-between
								font-medium text-gray-500 uppercase
								cursor-pointer
							"
							onClick={(event) => {
								event.preventDefault()
								setSelectedColor(color)
							}}
						>
							{color}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 group-open:rotate-45">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
						</summary>
						<div className="hidden group-open:flex flex-wrap items-center justify-center gap-4 p-4">
							{shades.map((shade) => (
								<ColorRadio key={`${color}-${shade}`} color={color} shade={shade} />
							))}
						</div>
					</details>
				))}
			</div>
		</div>
	)
}