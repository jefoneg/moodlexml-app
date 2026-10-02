import { MainContent } from "./app-component/main-content";
import { NavigationBar } from "./reusable-components/navigation-bar";

export default function Home() {
  return (
    <main>
      <NavigationBar />
      <MainContent />
    </main>
  );
}
