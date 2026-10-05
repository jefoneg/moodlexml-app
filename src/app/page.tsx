import MainContent from "./home/page";
import { NavigationBar } from "../reusable-components/navigation-bar";

export default function Home() {
  return (
    <main>
      <NavigationBar shouldShow={true}/>
      <MainContent />
    </main>
  );
}
