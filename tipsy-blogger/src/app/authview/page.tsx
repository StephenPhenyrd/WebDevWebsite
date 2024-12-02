import Header from "../components/Header"
import Button from "../components/Button"
import Link from "next/link"
import Item from "../components/Item"
import "./authview.css"



const initialItems = [
    <Item title="1785" barRating="3.9" drinkChoice="Electric Lemonade" drinkRating="3.8" review="Freshman Bar. DJ was good."/>,
    <Item title="Magnolia's" barRating="4.8" drinkChoice="Georgia Peach" drinkRating="4.5" review="Alumni Bar. Drinks were solid, pool tables are a nice touch."/>,
    <Item title="Bourbon" barRating="2.1" drinkChoice="Coors Light" drinkRating="4.0" review="Very crowded. Too many people for the amount of bartenders."/>
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