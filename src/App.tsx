import { Layout } from "@/components/layout"

export function App() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Library</h2>
        <p className="text-muted-foreground">
          Welcome to ChronoTube. Start by adding a YouTube video to your library.
        </p>
      </div>
    </Layout>
  );
}

export default App;
