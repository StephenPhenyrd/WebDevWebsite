import Header from "../components/Header"
import Button from "../components/Button"
import Link from "next/link"
import Item from "../components/Item"
import "./authview.css"



const initialItems = [
    <Item image="" title="1785" text="Great Drinks!"/>,
    <Item image="" title="Magnolia's" text="Amazing Environment"/>,
    <Item image="" title="Bourbon" text="Fun People"/>
  ];

export default function Authview() {
    return(
    <>
    <Header>
            <Button><Link href="/additem">Add New Review</Link></Button>
            <Button><Link href="/">Logout</Link></Button>
        </Header> 
    <div className="form-background">
        <div className="background-wrapper">

        </div>
        <div>
        


            <div className="item-container">   
                {initialItems.map((item, index) => (
                <div key={index}>
                {item}
                </div>
            
                ))}
            </div>
        </div> 
    </div>


    </>
    );
}