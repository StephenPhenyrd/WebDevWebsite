import Header from "./components/Header"
import Button from "./components/Button"
import Link from "next/link"

export default function Home() {
  return (
  <>
  <Header>
    <Button><Link href="/authview">Login</Link></Button>
    <Button><Link href="/additem">Sign Up</Link></Button>
  </Header>
  </>
  );
}



<Home />
