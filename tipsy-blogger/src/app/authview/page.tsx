import Header from "../components/Header"
import Button from "../components/Button"
import Link from "next/link"

export default function Authview() {
    return(
    <div>
    <Header>
        <Button><Link href="/">Logout</Link></Button>
        <Button><Link href="/additem">Add Item</Link></Button>
    </Header> 
    
    </div>
    );
}