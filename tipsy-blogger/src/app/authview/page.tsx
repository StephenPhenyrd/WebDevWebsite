import Header from "../components/Header"
import Button from "../components/Button"
import Link from "next/link"
import Item from "../components/Item"



const initialItems = [
    <Item image="" title="1785" text="Great Drinks!"/>,
    <Item image="" title="Magnolia's" text="Amazing Environment"/>,
    <Item image="" title="Bourbon" text="Fun People"/>
  ];

export default function Authview() {
    return(
    <div>
    <Header>
        <Button><Link href="/">Logout</Link></Button>
        <Button><Link href="/additem">Add Item</Link></Button>
    </Header> 

    <h1>Posts</h1>

        <div>   
            {initialItems.map((item, index) => (
            <div key={index}>
                {item}
            </div>
            ))}
        </div> 
    </div>



    );
}