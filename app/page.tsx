import ColorPicker from "./color-picker";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ColorPicker />
		</main>
  );
}
