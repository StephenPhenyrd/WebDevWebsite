import Header from "./components/Header"
import Button from "./components/Button"
import Link from "next/link"
import IntroCard from "./components/IntroCard";

export default function Home() {
  return (
  <div className="background">
  <Header>
    <Button><Link href="/authview">Login</Link></Button>
    <Button><Link href="/additem">Sign Up</Link></Button>
  </Header>
  <IntroCard />
  </div>
  );
}



<Home />
